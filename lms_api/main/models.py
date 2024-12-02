from django.db import models
from django.core import serializers

# Teacher Model
class Teacher(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100,blank=True,null=True)
    qualification = models.CharField(max_length=1200)
    mobile_no = models.CharField(max_length=20)
    profile_img=models.ImageField(upload_to='teacher_imgs/',null=True)
    skills = models.TextField()
    

    class Meta:
        verbose_name_plural = "1.Teachers"

    def __str__(self):
        return self.full_name

    def skill_list(self):
        return self.skills.split(',')

# CourseCategory Model
class CourseCategory(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "2.Course Categories"

    def __str__(self):
        return self.title

# Course Model
class Course(models.Model):
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='teacher_courses')
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    featured_img = models.ImageField(upload_to='course_imgs/', null=True)
    techs = models.TextField(blank=True)


    class Meta:
        verbose_name_plural = "3.Courses"

    def __str__(self):
        return self.title

    def related_videos(self):
        related_videos = Course.objects.filter(techs__icontains=self.techs)
        return serializers.serialize('json', related_videos)

    def tech_list(self):
        return self.techs.split(',')

    

# Chapter Model
class Chapter(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='course_chapters')
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    video = models.FileField(upload_to='chapter_videos/', null=True, blank=True)
    remarks = models.CharField(max_length=255, default="No remarks")

    class Meta:
        verbose_name_plural = "4.Chapters"

    def __str__(self):
        return self.title

# Student Model
class Student(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    username = models.CharField(max_length=1200)
    interests = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "5.Students"

    def __str__(self):
        return self.full_name

# StudentCourseEnrollment Model
class StudentCourseEnrollment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrolled_courses')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='enrolled_student')
    enrolled_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "6. Enrolled Courses"

    def __str__(self):
        return f"{self.student.full_name} enrolled in {self.course.title}"

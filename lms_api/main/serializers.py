from rest_framework import serializers
from . import models

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Teacher
        fields=['id','full_name','email','password','qualification','mobile_no','skills','profile_img','teacher_courses','skill_list']
        depth=1

    def __init__(self,*args,**kwargs):
        super(TeacherSerializer,self).__init__(*args,**kwargs)
        request=self.context.get('request')
        self.Meta.depth=0
        if request and request.method=='GET':
            self.Meta.depth=1

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseCategory
        fields = ['id', 'title', 'description']

class CourseSerializer(serializers.ModelSerializer):
    #category = serializers.PrimaryKeyRelatedField(queryset=models.CourseCategory.objects.all())
    #teacher = serializers.PrimaryKeyRelatedField(queryset=models.Teacher.objects.all())
    class Meta:
        model=models.Course
        fields=['id','category','teacher','title','description','featured_img','techs','course_chapters','related_videos','tech_list']
        depth=1     


class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Chapter
        fields = ['id', 'course', 'title', 'description', 'video', 'remarks']

    def validate(self, data):
        # Custom validation if needed
        if 'title' in data and not data['title']:
            raise serializers.ValidationError({'title': 'This field is required.'})
        return data

# Correctly indented StudentSerializer outside of other classes
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Student
        fields = ['id','full_name', 'email', 'password', 'username','interests']

class StudentCourseEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentCourseEnrollment
        fields = ['id', 'course', 'student','enrolled_time']
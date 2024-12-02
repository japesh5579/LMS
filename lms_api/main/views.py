from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, permissions
from rest_framework.exceptions import ValidationError
from django.contrib.auth.hashers import make_password, check_password
from .serializers import TeacherSerializer, CategorySerializer, CourseSerializer, ChapterSerializer, StudentSerializer, StudentCourseEnrollSerializer
from . import models
import json


# Teacher List View
class TeacherList(generics.ListCreateAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = []


# Teacher Detail View
class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = []



@csrf_exempt
def teacher_login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")

            if not email or not password:
                return JsonResponse({"bool": False, "error": "Email and password are required."}, status=400)

            teacher = models.Teacher.objects.filter(email=email).first()
            if teacher:
                # Direct password comparison (no hashing)
                if teacher.password == password:
                    return JsonResponse({"bool": True, "teacher_id": teacher.id})
                else:
                    return JsonResponse({"bool": False, "error": "Invalid email or password."}, status=400)
            else:
                return JsonResponse({"bool": False, "error": "Teacher not found."}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
    return JsonResponse({"error": "Invalid request method."}, status=405)


# Category List View
class CategoryList(generics.ListCreateAPIView):
    queryset = models.CourseCategory.objects.all()
    serializer_class = CategorySerializer
    permission_classes = []


# Course List View
class CourseList(generics.ListCreateAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = []

    def get_queryset(self):
        qs = super().get_queryset()
        if 'result' in self.request.GET:
            limit = int(self.request.GET['result'])
            qs = qs.order_by('-id')[:limit]

        if 'category' in self.request.GET:
            category = self.request.GET['category']
            qs = qs.filter(techs__icontains=category)

        if 'skill_name' in self.request.GET and 'teacher' in self.request.GET:
            skill_name = self.request.GET['skill_name']
            teacher = self.request.GET['teacher']
            teacher = models.Teacher.objects.filter(id=teacher).first()
            qs = qs.filter(techs__icontains=skill_name)

        return qs


# Course Detail View
class CourseDetailView(generics.RetrieveAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = []


# Teacher Course List View
class TeacherCourseList(generics.ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = []

    def get_queryset(self):
        teacher_id = self.kwargs["teacher_id"]
        return models.Course.objects.filter(teacher__id=teacher_id)


# Chapter List View
class TeacherCourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = []

# Chapter List View
class ChapterList(generics.ListCreateAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterSerializer
    permission_classes = []


# Course Chapter List View
class CourseChapterList(generics.ListAPIView):
    serializer_class = ChapterSerializer
    permission_classes = []

    def get_queryset(self):
        course_id = self.kwargs["course_id"]
        return models.Chapter.objects.filter(course__id=course_id)

class ChapterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterSerializer
    permission_classes = []

# Student List View
class StudentList(generics.ListCreateAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = []


# Student Login
@csrf_exempt
def student_login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")

            if not email or not password:
                return JsonResponse({"bool": False, "error": "Email and password are required."}, status=400)

            student = models.Student.objects.filter(email=email).first()
            if student:
                # Direct password comparison (no hashing)
                if student.password == password:
                    return JsonResponse({"bool": True, "student_id": student.id})
                else:
                    return JsonResponse({"bool": False, "error": "Invalid email or password."}, status=400)
            else:
                return JsonResponse({"bool": False, "error": "Student not found."}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
    return JsonResponse({"error": "Invalid request method."}, status=405)


# Enrollment Status Check
def fetch_enroll_status(request, student_id, course_id):
    student = models.Student.objects.filter(id=student_id).first()
    course = models.Course.objects.filter(id=course_id).first()
    if student and course:
        enroll_status = models.StudentCourseEnrollment.objects.filter(course=course, student=student).exists()
        return JsonResponse({"bool": enroll_status})
    return JsonResponse({"bool": False})


# Student Enrollment View
class StudentEnrollCourseList(generics.ListCreateAPIView):
    queryset = models.StudentCourseEnrollment.objects.all()
    serializer_class = StudentCourseEnrollSerializer
    permission_classes = []


# Teacher Password Change
@csrf_exempt
def teacher_change_password(request, teacher_id):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            password = data.get("password")

            if not password:
                return JsonResponse({"bool": False, "error": "Password is required."}, status=400)

            teacher = get_object_or_404(models.Teacher, id=teacher_id)
            teacher.password = password  # Directly store the password as plain text
            teacher.save()
            return JsonResponse({"bool": True})
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"bool": False, "error": "An error occurred while updating the password."}, status=500)
    return JsonResponse({"error": "Invalid request method."}, status=405)

from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import permissions
from .serializer import TeacherSerializer, CategorySerializer, CourseSerializer, ChapterSerializer, StudentSerializer
from . import models
import json

class TeacherList(generics.ListCreateAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = []  # Add permissions if needed

class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = []  # Add permissions if needed

@csrf_exempt  # Consider using proper token-based authentication in production
def teacher_login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)  # Parse JSON request body
            email = data.get('email')
            password = data.get('password')

            # Validate input fields
            if not email or not password:
                return JsonResponse({'bool': False, 'error': 'Email and password are required.'}, status=400)

            # Check credentials
            try:
                teacherData = models.Teacher.objects.get(email=email, password=password)
                return JsonResponse({'bool': True, 'teacher_id': teacherData.id})
            except models.Teacher.DoesNotExist:
                return JsonResponse({'bool': False, 'error': 'Invalid email or password.'}, status=401)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)

    return JsonResponse({'error': 'Invalid request method.'}, status=405)

class CategoryList(generics.ListCreateAPIView):
    queryset = models.CourseCategory.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [] 

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

        

class CourseDetailView(generics.RetrieveAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = []

class TeacherCourseList(generics.ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = []

    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher = models.Teacher.objects.get(pk=teacher_id)
        return models.Course.objects.filter(teacher=teacher)

class TeacherCourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = []

class ChapterList(generics.ListCreateAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterSerializer
    permission_classes = []  # Add permissions if needed

class CourseChapterList(generics.ListAPIView):
    serializer_class = ChapterSerializer
    permission_classes = []

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        course = models.Course.objects.get(pk=course_id)
        return models.Chapter.objects.filter(course=course)

class ChapterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterSerializer
    permission_classes = []

# Completing the StudentList view
class StudentList(generics.ListCreateAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = []  # Add permissions if needed

# Fix indentation here: Make sure it's not inside StudentList class
@csrf_exempt  # Consider using proper token-based authentication in production
def student_login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)  # Parse JSON request body
            email = data.get('email')
            password = data.get('password')

            # Validate input fields
            if not email or not password:
                return JsonResponse({'bool': False, 'error': 'Email and password are required.'}, status=400)

            # Check credentials
            try:
                studentData = models.Student.objects.get(email=email, password=password)
                return JsonResponse({'bool': True, 'student_id': studentData.id})
            except models.Student.DoesNotExist:
                return JsonResponse({'bool': False, 'error': 'Invalid email or password.'}, status=401)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)

    return JsonResponse({'error': 'Invalid request method.'}, status=405)

from django.urls import path
from . import views

urlpatterns = [
    # Teacher
    path('teacher/', views.TeacherList.as_view(), name='teacher-list'),
    path('teacher/<int:pk>/', views.TeacherDetail.as_view(), name='teacher-detail'),
    path('teacher/change-password/<int:teacher_id>/', views.teacher_change_password, name='teacher-change-password'),
    path('teacher-login/', views.teacher_login, name='teacher-login'),

    # Category
    path('category/', views.CategoryList.as_view(), name='category-list'),

    # Course
    path('course/', views.CourseList.as_view(), name='course-list'),
    path('course/<int:pk>/', views.CourseDetailView.as_view(), name='course-detail'),

    # Chapter
    path('chapter/', views.ChapterList.as_view(), name='chapter-list'),
    path('chapter/<int:pk>/', views.ChapterDetailView.as_view()),
    path('course-chapters/<int:course_id>/', views.CourseChapterList.as_view(), name='course-chapters'),

    # Teacher Courses
    path('teacher-courses/<int:teacher_id>/', views.TeacherCourseList.as_view(), name='teacher-courses'),
    path('teacher-course-detail/<int:pk>/', views.TeacherCourseDetail.as_view(), name='teacher-courses'),


    # Student
    path('student/', views.StudentList.as_view(), name='student-list'),
    path('student-login/', views.student_login, name='student-login'),
    path('student-enroll-course/', views.StudentEnrollCourseList.as_view(), name='student-enroll-course'),

    # Enrollment Status
    path('fetch-enroll-status/<int:course_id>/<int:student_id>/', views.fetch_enroll_status, name='fetch-enroll-status'),
]

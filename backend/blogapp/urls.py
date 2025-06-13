from django.urls import path
from .views import BlogListCreateView, BlogDetailView, MyBlogListView
from django.contrib.auth.models import User
from django.http import JsonResponse

def create_test_user(request):
    if not User.objects.filter(username="admin").exists():
        User.objects.create_superuser("admin", "admin@example.com", "admin123")
        return JsonResponse({"message": "Test admin user created"})
    return JsonResponse({"message": "Admin already exists"})

urlpatterns = [
    path('blogs/', BlogListCreateView.as_view(), name='blog-list-create'),
    path('blogs/<int:pk>/', BlogDetailView.as_view(), name='blog-detail'),
    path('myblogs/', MyBlogListView.as_view(), name='myblogs'),
    path('create-admin/', create_test_user),
]

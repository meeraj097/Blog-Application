from django.urls import path, include
from rest_framework import routers
from .views import BlogViewSet  # import your viewset
from django.contrib.auth.models import User
from django.http import JsonResponse

def create_test_user(request):
    if not User.objects.filter(username="admin").exists():
        User.objects.create_superuser("admin", "admin@example.com", "admin123")
        return JsonResponse({"message": "Test admin user created"})
    return JsonResponse({"message": "Admin already exists"})

router = routers.DefaultRouter()
router.register(r'blogs', BlogViewSet, basename='blog')

urlpatterns = [
    path('', include(router.urls)),  # registers /blogs/ endpoints automatically
    path('create-admin/', create_test_user),  # keep this if you want the test user route
]

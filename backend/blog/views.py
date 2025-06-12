from rest_framework import viewsets
from rest_framework.permissions import BasePermission, SAFE_METHODS
from .models import Blog
from .serializers import BlogSerializer

class ReadOnlyOrAuthenticated(BasePermission):
    """
    Custom permission to allow read-only access for any user,
    but write access only for authenticated users.
    """
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated

class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [ReadOnlyOrAuthenticated]

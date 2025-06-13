from rest_framework import viewsets
from rest_framework.permissions import BasePermission, SAFE_METHODS
from .models import BlogPost
from .serializers import BlogSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class ReadOnlyOrAuthenticated(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated

class BlogViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

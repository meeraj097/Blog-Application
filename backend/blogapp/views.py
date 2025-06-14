from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .models import BlogPost
from .serializers import BlogSerializer

class BlogPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 100

# Public blog listing and blog creation
class BlogListCreateView(generics.ListCreateAPIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = BlogPagination

    def get_queryset(self):
        return BlogPost.objects.all().order_by('-created_at')

    def perform_create(self, serializer):
        print("✅ Creating blog for user:", self.request.user.username)
        serializer.save(author=self.request.user)

# Publicly viewable, editable by authenticated users
class BlogDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

# Shows only the logged-in user's blogs (admin dashboard)
class MyBlogListView(generics.ListAPIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]  # ✅ Enforce login
    pagination_class = BlogPagination  # ✅ Consistent with public view

    def get_queryset(self):
        user = self.request.user
        print("🧾 Authenticated user fetching their blogs:", user.username)
        return BlogPost.objects.filter(author=user).order_by('-created_at')

# Utility view to create admin account
class CreateAdminUser(APIView):
    def get(self, request):
        if not User.objects.filter(username="admin").exists():
            User.objects.create_superuser("admin", "admin@example.com", "admin123")
            return Response(
                {"message": "Admin user created successfully"},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {"message": "Admin user already exists"},
            status=status.HTTP_200_OK
        )

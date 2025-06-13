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

class BlogListCreateView(generics.ListCreateAPIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = BlogPagination

    def get_queryset(self):
        return BlogPost.objects.all().order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class BlogDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class MyBlogListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        blogs = BlogPost.objects.filter(author=request.user).order_by('-created_at')
        serializer = BlogSerializer(blogs, many=True)
        return Response(serializer.data)

class CreateAdminUser(APIView):
    def get(self, request):
        if not User.objects.filter(username="admin").exists():
            User.objects.create_superuser("admin", "admin@example.com", "admin123")
            return Response({"message": "Admin user created successfully"}, status=status.HTTP_201_CREATED)
        return Response({"message": "Admin user already exists"}, status=status.HTTP_200_OK)

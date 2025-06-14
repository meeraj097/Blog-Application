from django.urls import path
from .views import BlogListCreateView, BlogDetailView, MyBlogListView, CreateAdminUser

urlpatterns = [
    path('blogs/', BlogListCreateView.as_view(), name='blog-list-create'),      # POST + GET all blogs
    path('blogs/<int:pk>/', BlogDetailView.as_view(), name='blog-detail'),      # GET/PUT/DELETE a blog
    path('myblogs/', MyBlogListView.as_view(), name='myblogs'),                 # GET only logged-in user's blogs
    path('create-admin/', CreateAdminUser.as_view(), name='create-admin'),      # Create test admin
]

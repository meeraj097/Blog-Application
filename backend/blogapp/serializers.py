# blogapp/serializers.py

from rest_framework import serializers
from .models import BlogPost

class BlogSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source='author.username', read_only=True)  # ✅ Add this

    class Meta:
        model = BlogPost
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'author']

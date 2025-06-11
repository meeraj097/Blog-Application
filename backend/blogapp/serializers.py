# blogapp/serializers.py

from rest_framework import serializers
from .models import BlogPost

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'author']  # ✅ Add this line

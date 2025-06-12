from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to the Blog API!")

urlpatterns = [
    path('', home),  # 👈 This handles the root URL
    path('admin/', admin.site.urls),
    path('api/', include('blogapp.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include('blogapp.urls')), 
]
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView



from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls import url
from rest_auth import views as auth_views 
from django.views.generic import TemplateView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('notemaster.urls')),
    path('api/auth/', include('rest_auth.urls')),
    path('api/auth/registration/', include('rest_auth.registration.urls')),
    re_path('.*', TemplateView.as_view(template_name="index.html") )
]

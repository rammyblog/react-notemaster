"""evernote URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
# from django.contrib.auth import views as auth_views
from rest_auth import views as auth_views 
# (
#     LoginView, LogoutView, UserDetailsView, PasswordChangeView,
#     PasswordResetView, PasswordResetConfirmView
# )


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('notemaster.urls')),
    path('api/auth/', include('rest_auth.urls')),
   
    path('api/auth/registration/', include('rest_auth.registration.urls')),
    # url(r'^password-reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', auth_views.PasswordResetConfirmView.as_view(),  name='password_reset_confirm'),
#     path('notemaster/auth/reset', auth_views.PasswordResetView.as_view(
#        template_name = 'notemaster/password_reset_form.html', email_template_name = 'notemaster/password_reset_email.html', subject_template_name = 'notemaster/password_reset_subject.txt' ), 
#     name = 'password_reset'
#     ),
#     path('notemaster/auth/reset/done', auth_views.PasswordResetDoneView.as_view(
#         template_name = 'notemaster/password_reset_done.html'
#         ), name = 'password_reset_done'),

#     path('notemaster/auth/reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(
#         template_name = 'notemaster/password_reset_confirm.html'),
#     name = 'password_reset_confirm'),


#     path('notemaster/auth/reset/complete/', auth_views.PasswordResetCompleteView.as_view(template_name='notemaster/password_reset_complete.html'),
#     name='password_reset_complete'), 

#    path('notemaster/auth/settings/password/', auth_views.PasswordChangeView.as_view(template_name='notemaster/password_change.html'),
#     name='password_change'),

#    path('notemaster/auth/settings/password/done/', auth_views.PasswordChangeDoneView.as_view(
#     template_name='notemaster/password_change_done.html'),
#     name='password_change_done'
#     ),
]

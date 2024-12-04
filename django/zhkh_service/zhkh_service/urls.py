"""
URL configuration for zhkh_service project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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
from django.conf import settings
from django.contrib import admin
from django.contrib.auth.views import PasswordResetConfirmView
from django.urls import include, path

from web.views import PasswordResetCompleteCustomView

urlpatterns = [
    path('admin/', admin.site.urls),

    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('auth/', include('djoser.urls.jwt')),

    path('password/reset/confirm/<str:uidb64>/<str:token>/', PasswordResetConfirmView.as_view(),
         name='password_reset_confirm'),
    path('password/reset/complete/', PasswordResetCompleteCustomView.as_view(), name='password_reset_complete'),
    path('accounts/', include('accounts.urls')),
    path('communication/', include('communication.urls')),
    path('web/', include('web.urls')),
]

if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
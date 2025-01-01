"""
ASGI config for zhkh_service project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os

import socketio
from django.core.asgi import get_asgi_application

from communication.chat import sio

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'zhkh_service.settings')

application = get_asgi_application()
app = socketio.ASGIApp(sio, application)
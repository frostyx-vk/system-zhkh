"""
WSGI config for zhkh_service project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/
"""

import os

import socketio
from django.core.wsgi import get_wsgi_application

from communication.chat import sio

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'zhkh_service.settings')

application = get_wsgi_application()
sio = socketio.Server(async_mode='threading', cors_allowed_origins='*')
application = socketio.WSGIApp(sio, application)
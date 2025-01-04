import logging

from aiohttp import web
from django.core.management import BaseCommand

from communication.chat import app

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = 'Запуск чата'

    def handle(self, *args, **options):
        web.run_app(app, port=8005)
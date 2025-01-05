import uuid

from django.db import models

from accounts.models import User


class MessageProblem(models.Model):
    class Status(models.TextChoices):
        NEW = 'NEW', 'Новое'
        VIEWED = 'VIEWED', 'Просмотрено'
        REACTED = 'REACTED', 'Отреагировано'

    title = models.CharField('Тема сообщения', max_length=100)
    content = models.TextField('Сообщение')
    email = models.EmailField('Электронная почта')
    status = models.CharField(choices=Status.choices, default=Status.NEW, max_length=100, verbose_name='Статус')
    date_created = models.DateTimeField('Дата создания', auto_now_add=True)

    class Meta:
        verbose_name = 'Сообщение о проблеме'
        verbose_name_plural = 'Сообщения о проблемах'

    def __str__(self):
        return self.title


class Chat(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="owners", verbose_name='Владелец')
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name="recipients", verbose_name='Получатель')
    short_id = models.CharField(max_length=255, default=uuid.uuid4, unique=True)

    class Meta:
        verbose_name = 'Чат'
        verbose_name_plural = 'Чаты'


class ChatMessage(models.Model):
    class Statuses(models.TextChoices):
        new = 'new', 'Новое'
        reading = 'reading', 'Прочитано'

    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name="messages", verbose_name='Чат')
    sender = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Отправитель')
    text = models.TextField(verbose_name='Текст')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    status = models.CharField(max_length=255, choices=Statuses.choices, default=Statuses.new, verbose_name='Статус')

    class Meta:
        verbose_name = 'Сообщение чата'
        verbose_name_plural = 'Сообщения чатов'

    def __str__(self):
        return f'{self.chat} - {self.text}'

from django.db import models


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
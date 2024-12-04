from django.contrib import admin

from communication.models import MessageProblem


@admin.register(MessageProblem)
class MessageProblemAdmin(admin.ModelAdmin):
    list_display = ('title', 'email', 'status')

from django.contrib import admin

from communication.models import MessageProblem, Chat, ChatMessage


@admin.register(MessageProblem)
class MessageProblemAdmin(admin.ModelAdmin):
    list_display = ('title', 'email', 'status')


@admin.register(Chat)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('short_id', 'owner')


@admin.register(ChatMessage)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('chat', 'status', 'created_at')

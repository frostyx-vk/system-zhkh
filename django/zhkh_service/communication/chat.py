import json

import socketio
from asgiref.sync import sync_to_async
from django.shortcuts import get_object_or_404


sio = socketio.AsyncServer(async_mode="asgi",cors_allowed_origins="*")

@sio.event
async def connect(sid, environ, auth):
    if auth:
        chat_id = auth['chat_id']
        print("SocketIO connect")
        await sio.enter_room(sid, chat_id)
    else:
        raise ConnectionRefusedError("No auth")

@sio.event
async def disconnect(sid):
    print(f'Клиент - {sid} покинул комнату')
    await sio.leave_room(sid, 'common_room')


def create_message_message(data):
    from accounts.models import User
    from communication.models import Chat, ChatMessage
    from communication.serializers import MessageSerializer
    from rest_framework.authtoken.models import Token

    data = json.loads(data)
    sender_token = data["sender_token"]

    token = Token.objects.get(key=sender_token)
    if not token:
        raise ConnectionRefusedError("No token")

    user = token.user.pk
    chat_id = data["chat_id"]
    text = data["text"]
    sender = get_object_or_404(User, pk=user.pk)
    chat = get_object_or_404(Chat, short_id=chat_id)

    instance = ChatMessage.objects.create(sender=sender, chat=chat, text=text)
    instance.save()

    message = MessageSerializer(instance).data
    message["chat"] = chat_id
    message["sender"] = str(message["sender"])
    return message


@sio.on('message')
async def print_message(sid, data):
    message = await sync_to_async(create_message_message, thread_sensitive=True)(data)
    await sio.emit("message", message, room=message["chat"])
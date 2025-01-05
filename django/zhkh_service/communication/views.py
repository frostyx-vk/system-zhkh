from django.core import serializers
from django.http import JsonResponse
from rest_framework import status
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import User
from communication.models import Chat, ChatMessage
from communication.serializers import MessageProblemSerializer, ChatSerializer, MessageSerializer


class  MessageProblemAPIView(APIView):
    def post(self, request):
        serializer = MessageProblemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'status':'Сообщение о проблеме доставлено'})
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST, safe=False)


class GetChatAPIView(GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ChatSerializer

    def get(self, request):
        if request.user.is_staff:
            chats = Chat.objects.filter(recipient=request.user)
            return JsonResponse({'chats': serializers.serialize('json', chats)})
        else:
            recipient = User.objects.filter(is_staff=True).first()
            chat, created = Chat.objects.get_or_create(owner=request.user, recipient=recipient)
            serializer = self.serializer_class(instance=chat)
            return Response({"message": "Chat gotten", "data": serializer.data}, status=status.HTTP_200_OK)


class CreateChatMessageAPIView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MessageSerializer

    def post(self, request):
        request_short_id = request.data.get('short_id')
        if request_short_id:
            user = request.user
            chat = Chat.objects.filter(short_id=request_short_id).first()
            text = request.data.get('text')
            data = {'text': text, 'chat': chat, 'sender': user}
            serializer = self.serializer_class(data=data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({'status': 'ok'})
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST, safe=False)
        return JsonResponse({'error': 'short_id does not exist'}, status=status.HTTP_404_NOT_FOUND)


class GetMessagesAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MessageSerializer

    def get_queryset(self):
        chat_id = self.request.GET.get('chat_id')
        if chat_id:
            return ChatMessage.objects.filter(chat_id=chat_id).order_by('-id')
        return ChatMessage.objects.none()
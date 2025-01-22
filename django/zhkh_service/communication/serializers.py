from rest_framework.fields import SerializerMethodField
from rest_framework.serializers import ModelSerializer

from .models import MessageProblem, ChatMessage, Chat


class MessageProblemSerializer(ModelSerializer):
    class Meta:
        model = MessageProblem
        fields = ('title', 'content', 'email', 'status', 'date_created')

    def update(self, instance, validated_data):
        return instance


class MessageSerializer(ModelSerializer):
    token = SerializerMethodField()
    sender_fullname = SerializerMethodField()

    class Meta:
        model = ChatMessage
        fields = ('chat', 'sender', 'sender_fullname', 'text', 'created_at', 'status', 'token')


    def get_token(self, obj):
        from rest_framework.authtoken.models import Token
        token = Token.objects.filter(user=obj.sender).first()
        if token:
            return token.key
        return ''

    def get_sender_fullname(self, obj):
        return f'{obj.sender.first_name} {obj.sender.last_name}'

class ChatSerializer(ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)
    owner = SerializerMethodField()
    recipient = SerializerMethodField()
    class Meta:
        model = Chat
        fields = ['messages', 'short_id', 'owner', 'recipient']

    def get_owner(self, obj):
        return f'{obj.owner.first_name} {obj.owner.last_name}'

    def get_recipient(self, obj):
        return f'{obj.recipient.first_name} {obj.recipient.last_name}'



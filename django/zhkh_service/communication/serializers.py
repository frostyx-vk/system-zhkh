from rest_framework.fields import SerializerMethodField
from rest_framework.serializers import ModelSerializer

from communication.models import MessageProblem, ChatMessage, Chat


class MessageProblemSerializer(ModelSerializer):
    class Meta:
        model = MessageProblem
        fields = ('title', 'content', 'email', 'status', 'date_created')

    def update(self, instance, validated_data):
        return instance


class MessageSerializer(ModelSerializer):
    token = SerializerMethodField()

    class Meta:
        model = ChatMessage
        fields = ('chat', 'sender', 'text', 'created_at', 'status', 'token')


    def get_token(self, obj):
        from rest_framework.authtoken.models import Token
        token = Token.objects.filter(user=obj.sender).first()
        if token:
            return token.key
        return ''

class ChatSerializer(ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)
    class Meta:
        model = Chat
        fields = ['messages', 'short_id']



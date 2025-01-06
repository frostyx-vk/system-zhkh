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
    class Meta:
        model = ChatMessage
        fields = '__all__'


class ChatSerializer(ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)
    token = SerializerMethodField()
    class Meta:
        model = Chat
        fields = ['messages', 'short_id', 'token']

    def get_token(self, obj):
        from rest_framework.authtoken.models import Token
        token = Token.objects.filter(user=obj.sender).first()
        return token.key

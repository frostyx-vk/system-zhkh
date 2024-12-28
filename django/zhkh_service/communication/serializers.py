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
        exclude = ("chat",)


class ChatSerializer(ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)
    class Meta:
        model = Chat
        fields = ["messages", "short_id"]

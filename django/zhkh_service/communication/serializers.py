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
    class Meta:
        model = Chat
        fields = ('short_id',)

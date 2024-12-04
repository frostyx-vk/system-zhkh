from rest_framework.serializers import ModelSerializer

from communication.models import MessageProblem


class MessageProblemSerializer(ModelSerializer):
    class Meta:
        model = MessageProblem
        fields = ('title', 'content', 'email', 'status', 'date_created')

    def update(self, instance, validated_data):
        return instance
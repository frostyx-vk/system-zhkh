from rest_framework.serializers import ModelSerializer


from .models import User


class UserDataPlaceSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'number_ls', 'address', 'square', 'type')
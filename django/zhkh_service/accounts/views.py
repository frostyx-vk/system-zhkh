from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserSerializer


class GetUserDataView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get(self, request):
        serializer = self.serializer_class(instance=self.request.user)
        return Response({"message": "Chat gotten", "data": serializer.data}, status=status.HTTP_200_OK)

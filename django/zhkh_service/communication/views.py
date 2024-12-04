from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView

from communication.serializers import MessageProblemSerializer


class  MessageProblemAPIView(APIView):
    def post(self, request):
        serializer = MessageProblemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'status':'Сообщение о проблеме доставлено'})
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST, safe=False)
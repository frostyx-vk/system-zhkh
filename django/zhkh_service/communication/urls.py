from django.urls import path

from communication.views import MessageProblemAPIView, GetChatAPIView
app_name = 'communication'


urlpatterns = [
    path('create-message-problem/', MessageProblemAPIView.as_view(), name='create-message-problem'),
    path('get-chat/', GetChatAPIView.as_view(), name='get-chat'),
]
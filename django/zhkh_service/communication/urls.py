from django.urls import path

from communication.views import MessageProblemAPIView


app_name = 'communication'


urlpatterns = [
    path('create-message-problem/', MessageProblemAPIView.as_view(), name='create-message-problem'),
]
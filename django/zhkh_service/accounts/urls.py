from django.urls import path

from accounts.views import GetUserDataView

app_name = 'accounts'

urlpatterns = [
    path('get-user-data/', GetUserDataView.as_view(), name='get-user-data'),
]
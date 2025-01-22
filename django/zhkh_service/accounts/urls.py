from django.urls import path

from accounts.views import GetUserDataPlaceView

app_name = 'accounts'

urlpatterns = [
    path('get-user-data/', GetUserDataPlaceView.as_view(), name='get-user-data'),
]
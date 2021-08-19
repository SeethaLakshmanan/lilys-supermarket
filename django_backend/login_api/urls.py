from django.urls import path
from login_api.views import UsersView, PasswordReset, CustomAuthToken

app_name = "login_api"

urlpatterns = [
    path('signup', UsersView.as_view(), name='signup'),
    path('login', CustomAuthToken.as_view(), name='login'),
    path('forgot_password', PasswordReset.as_view(), name='forgot_password'),
]
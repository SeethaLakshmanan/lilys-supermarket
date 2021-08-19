from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core import serializers
import json

from login_api.serializers import UsersSerializer
from login_api.models import UsersModel


# class containing logic for registering a new user
class UsersView(APIView):
    def post(self, request):
        serializer = UsersSerializer(data=request.data)
        response_data = {}
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            response_data['response'] = 'User registration successful'
            response_data['userId'] = user.id
            response_data['token'] = token.key  # can add more properties to be returned
            print(response_data)
        else:
            response_data = serializer.errors
        return Response(response_data)


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'username': user.first_name,
            'userId': user.id
        })


class PasswordReset(APIView):
    def post(self, request):
        try:
            user = UsersModel.objects.get(email=request.data['email'])
        except UsersModel.DoesNotExist:
            return Response({'response': 'Not a registered email address.'})
        return Response()

from rest_framework import serializers
from login_api.models import UsersModel


class UsersSerializer(serializers.ModelSerializer):
    # Serializer for login/signup
    class Meta:
        model = UsersModel
        fields = ['first_name', 'last_name', 'email', 'password']
        # extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = UsersModel(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


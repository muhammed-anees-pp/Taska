from django.contrib.auth import authenticate
from .models import User


"""
AUTHENTICATION SERVICE
"""
class AuthService:
    @staticmethod
    def register(validated_data):
        user_data = validated_data.copy()
        user_data.pop("confirm_password", None)
        return User.objects.create_user(**user_data)

    @staticmethod
    def login(email, password):
        user = authenticate(email=email, password=password)

        if not user:
            return None

        return user

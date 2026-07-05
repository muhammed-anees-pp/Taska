from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import logout
from .serializers import (RegisterSerializer, LoginSerializer,)
from .services import AuthService

# # Create your views here.
"""
USER REGISTER
"""
class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = AuthService.register(serializer.validated_data)

        return Response(
            {
                "message": "Registration successful",
                "email": user.email
            },
            status=status.HTTP_201_CREATED
        )

"""
USER LOGIN
"""
class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = AuthService.login(
            serializer.validated_data["email"],
            serializer.validated_data["password"]
        )

        if not user:
            return Response(
                {
                    "message": "User not exist"
                },
                status=status.HTTP_401_UNAUTHORIZED
            )

        return Response(
            {
                "message": "Login successful",
                "email": user.email
            }
        )


"""
USER LOGOUT
"""
class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response(
            {
                "message": "Logout successful"
            },
            status=status.HTTP_200_OK
        )

from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import UserProfile
from .serializers import (
    UserRegistrationSerializer,
    UserLoginSerializer,
    UserDetailSerializer,
    UserProfileUpdateSerializer,
    PasswordChangeSerializer,
    ForgotPasswordSerializer,
    ResetPasswordSerializer,
    AdminUserSerializer,
)


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            tokens = get_tokens_for_user(user)
            user_data = UserDetailSerializer(user).data
            return Response({
                'message': 'Registration successful. Welcome to PixelGenCreativity!',
                'tokens': tokens,
                'user': user_data,
            }, status=status.HTTP_201_CREATED)
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            tokens = get_tokens_for_user(user)
            user_data = UserDetailSerializer(user).data
            return Response({
                'message': 'Login successful.',
                'tokens': tokens,
                'user': user_data,
            }, status=status.HTTP_200_OK)
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserDetailSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request):
        serializer = UserProfileUpdateSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'message': 'Profile updated successfully.',
                'user': UserDetailSerializer(user).data,
            }, status=status.HTTP_200_OK)
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = PasswordChangeSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = request.user
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            tokens = get_tokens_for_user(user)
            return Response({
                'message': 'Password changed successfully.',
                'tokens': tokens,
            }, status=status.HTTP_200_OK)
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ForgotPasswordView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user_exists = User.objects.filter(email__iexact=email).exists()
            return Response({
                'message': 'If an account with this email exists, a password reset code has been generated.',
                'email': email,
                'demo_code': 'PIXEL-8849',  # Helpful for local/sandbox testing without SMTP server
            }, status=status.HTTP_200_OK)
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ResetPasswordView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            code = serializer.validated_data['code']
            new_password = serializer.validated_data['new_password']

            try:
                user = User.objects.get(email__iexact=email)
                user.set_password(new_password)
                user.save()
                return Response({
                    'message': 'Password has been reset successfully. You can now login with your new password.',
                }, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({'errors': {'email': ['No account found with this email.']}}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class AdminUserListView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        users = User.objects.all().order_by('-date_joined')
        serializer = AdminUserSerializer(users, many=True)
        return Response({
            'count': users.count(),
            'users': serializer.data,
        }, status=status.HTTP_200_OK)


class AdminUserDetailView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def patch(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        if 'is_active' in request.data:
            user.is_active = bool(request.data['is_active'])
            user.save()

        if 'role' in request.data:
            role = request.data['role']
            profile, _ = UserProfile.objects.get_or_create(user=user)
            if role in ['customer', 'designer', 'admin']:
                profile.role = role
                profile.save()
                if role == 'admin':
                    user.is_staff = True
                else:
                    user.is_staff = False
                user.save()

        return Response({
            'message': 'User updated successfully',
            'user': AdminUserSerializer(user).data
        }, status=status.HTTP_200_OK)

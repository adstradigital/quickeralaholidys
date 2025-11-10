from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from .serializers import UserLoginSerializer
from .models import User
from .serializers import UserSerializer





# Endpoint: List all users (Admin only)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_users(request):
    try:
        if not request.user.is_admin:
            return Response({"status": "error", "message": "Only admin access"})

        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response({'status': 'success', 'data': serializer.data})
    except Exception as e:
        return Response({'status': 'error', 'message': str(e)})





# Endpoint: Create a new user (Admin only)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_user(request):
    try:
        if not request.user.is_admin:
            return Response({"status": "error", "message": "Only admin access"})

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'success', 'data': serializer.data})
        return Response({'status': 'error', 'message': serializer.errors})
    except Exception as e:
        return Response({'status': 'error', 'message': str(e)})




# Endpoint: Disable/Enable user (Admin only)
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def toggle_user_status(request, user_id):
    try:
        # Only admin can access
        if not request.user.is_admin:
            return Response({"status": "error", "message": "Only admin access"})

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"status": "error", "message": "User not found"})

        # Toggle active status
        new_status = request.data.get("is_active")
        if new_status is None:
            return Response({"status": "error", "message": "Provide 'is_active': true/false"})

        user.is_active = new_status
        user.save()

        return Response({
            "status": "success",
            "message": f"User {'activated' if user.is_active else 'deactivated'} successfully",
            "data": UserSerializer(user).data
        })

    except Exception as e:
        return Response({"status": "error", "message": str(e)})
    


# Endpoint: Update User (Admin only)
@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_user(request, user_id):
    try:
        if not request.user.is_admin:
            return Response({"status": "error", "message": "Only admin access"})

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"status": "error", "message": "User not found"})

        serializer = UserSerializer(user, data=request.data, partial=True)  # partial=True allows PATCH
        if serializer.is_valid():
            serializer.save()
            return Response({
                'status': 'success',
                'message': 'User updated successfully',
                'data': serializer.data
            })
        return Response({'status': 'error', 'message': serializer.errors})

    except Exception as e:
        return Response({'status': 'error', 'message': str(e)})



# Endpoint: Delete User (Admin only)
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user(request, user_id):
    try:
        if not request.user.is_admin:
            return Response({"status": "error", "message": "Only admin access"})

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"status": "error", "message": "User not found"})

        user.delete()
        return Response({
            "status": "success",
            "message": "User deleted successfully"
        })

    except Exception as e:
        return Response({"status": "error", "message": str(e)})

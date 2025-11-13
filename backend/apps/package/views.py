import traceback
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes,authentication_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser,AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Package, Category, Booking
from .serializers import PackageSerializer, CategorySerializer, BookingSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.shortcuts import get_object_or_404


@api_view(['GET'])
def package_list(request):
    """List all packages"""
    try:
        packages = Package.objects.filter(is_active=True)
        serializer = PackageSerializer(packages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def package_detail(request, pk):
    """Get package details"""
    try:
        package = Package.objects.get(pk=pk)
        serializer = PackageSerializer(package)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Package.DoesNotExist:
        return Response({'error': 'Package not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def category_list(request):
    """List all categories"""
    try:
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def create_booking(request):
    """
    Handle booking submission from frontend and save it in the database.
    """
    try:
        # Extract nested fields from frontend JSON
        data = request.data

        # Flatten the structure
        booking_data = {
            "package": data.get("package", {}).get("id") if data.get("package") else None,
            "user": data.get("user"),  # Optional - if frontend sends user ID
            "first_name": data.get("personalInfo", {}).get("firstName"),
            "last_name": data.get("personalInfo", {}).get("lastName"),
            "email": data.get("personalInfo", {}).get("email"),
            "phone": data.get("personalInfo", {}).get("phone"),
            "address": data.get("personalInfo", {}).get("address"),
            "country": data.get("personalInfo", {}).get("country", "India"),
            "start_date": data.get("travelDates", {}).get("startDate"),
            "end_date": data.get("travelDates", {}).get("endDate"),
            "adults": data.get("travelers", {}).get("adults", 1),
            "children": data.get("travelers", {}).get("children", 0),
            "custom_destination": data.get("tourDetails", {}).get("destination"),
            "custom_preferences": data.get("tourDetails", {}).get("preferences"),
            "special_requests": data.get("preferences", {}).get("specialRequests"),
            "promo_code": (data.get("appliedPromo") or {}).get("code"),
        }

        serializer = BookingSerializer(data=booking_data)

        if serializer.is_valid():
            booking = serializer.save()
            
            # Calculate pricing (backend logic)
            promo_discount = 0
            if data.get("appliedPromo"):
                promo_discount = data.get("appliedPromo", {}).get("discount", 0)
            
            booking.calculate_pricing(promo_discount_amount=promo_discount)
            booking.save()

            return Response({
                "message": "Booking saved successfully!",
                "booking": BookingSerializer(booking).data
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print(traceback.format_exc())
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['GET'])
@authentication_classes([])      # override global JWT requirement
@permission_classes([AllowAny])
def list_bookings(request):
    try:
        user_id = request.query_params.get('user')

        if user_id:
            bookings = Booking.objects.filter(user=user_id).order_by('-id')
        else:
            bookings = Booking.objects.all().order_by('-id')

        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        print("AUTH HEADER:", request.headers.get("Authorization"))
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PATCH'])
@authentication_classes([])          # <-- disable JWT
@permission_classes([AllowAny])      # <-- allow all
def confirm_booking(request, booking_id):
    booking = get_object_or_404(Booking, id=booking_id)
    booking.status = "confirmed"
    booking.save()
    return Response({"message": "Booking confirmed"}, status=200)


@api_view(['PATCH'])
@authentication_classes([])          # <-- disable JWT
@permission_classes([AllowAny])      # <-- allow all
def reject_booking(request, booking_id):
    booking = get_object_or_404(Booking, id=booking_id)
    booking.status = "rejected"
    booking.save()
    return Response({"message": "Booking rejected"}, status=200)

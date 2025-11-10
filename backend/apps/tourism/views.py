from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Category, Service, Enquiry, ServiceImage
from .serializers import CategorySerializer, ServiceSerializer, EnquirySerializer


# -------------------------
# Category APIs
# -------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_categories(request):
    try:
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response({'status': 'success', 'data': serializer.data})
    except Exception as e:
        return Response({'status': 'error', 'message': str(e)})



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_category(request):
    try:
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'success', 'data': serializer.data})
        return Response({'status': 'error', 'message': serializer.errors})
    except Exception as e:
        return Response({'status': 'error', 'message': str(e)})



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_category(request, category_id):
    try:
        category = Category.objects.filter(id=category_id).first()
        if not category:
            return Response({'status': 'error', 'message': 'Category not found'})
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'success', 'data': serializer.data})
        return Response({'status': 'error', 'message': serializer.errors})
    except Exception as e:
        return Response({'status': 'error', 'message': str(e)})



@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_category(request, category_id):
    try:
        category = Category.objects.filter(id=category_id).first()
        if not category:
            return Response({'status': 'error', 'message': 'Category not found'})
        category.delete()
        return Response({'status': 'success', 'message': 'Category deleted'})
    except Exception as e:
        return Response({'status': 'error', 'message': str(e)})




# -------------------------
# Service APIs
# -------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_services(request):
    try:
        services = Service.objects.all()
        serializer = ServiceSerializer(services, many=True)
        print(serializer.data)
        return Response({'status': 'success', 'data': serializer.data})
    except Exception as e:
        return Response({'status': 'error', 'message': str(e)})



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_service(request):
    print(request.data)
    serializer = ServiceSerializer(data=request.data)
    if serializer.is_valid():
        service = serializer.save()

        # multiple images
        for file in request.FILES.getlist("images"):
            ServiceImage.objects.create(service=service, image=file)

        return Response({"status": "success", "data": ServiceSerializer(service).data})
    return Response({"status": "error", "errors": serializer.errors})



@api_view(['PATCH', 'PUT'])
@permission_classes([IsAuthenticated])
def update_service(request, service_id):
    try:
        service = Service.objects.get(id=service_id)
    except Service.DoesNotExist:
        return Response({"status": "error", "message": "Service not found"}, status=404)

    serializer = ServiceSerializer(service, data=request.data, partial=True)  # partial=True = PATCH support
    if serializer.is_valid():
        service = serializer.save()

        # append new images if provided
        for file in request.FILES.getlist("images"):
            ServiceImage.objects.create(service=service, image=file)

        return Response({"status": "success", "data": ServiceSerializer(service).data})
    return Response({"status": "error", "errors": serializer.errors}, status=400)





@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_service(request, service_id):
    try:
        service = Service.objects.filter(id=service_id).first()
        if not service:
            return Response({'status': 'error', 'message': 'Service not found'})
        service.delete()
        return Response({'status': 'success', 'message': 'Service deleted'})
    except Exception as e:
        return Response({'status': 'error', 'message': str(e)})
    



@api_view(['GET'])
@permission_classes([AllowAny])
def list_services(request):
    try:
        services = Service.objects.all()
        serializer = ServiceSerializer(services, many=True)
        return Response({'status': 'success', 'data': serializer.data})
    except Exception as e:
        return Response({'status': 'error', 'message': str(e)})




# -------------------------
# Enquiry APIs
# -------------------------
@api_view(['POST'])
@permission_classes([AllowAny])  # public form
def submit_trip_enquiry(request):
    try:
        data = request.data
        serializer = EnquirySerializer(data={
            'name': data.get('name'),
            'email': data.get('email'),
            'phone': data.get('phone'),
            'message': data.get('message'),
            'service': data.get('service'),
            'product': data.get('tripType'),  # map tripType to product
            'status': 'Pending'
        })
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'success', 'data': serializer.data})
        return Response({'status': 'error', 'message': serializer.errors})
    except Exception as e:
        return Response({'status': 'error', 'message': str(e)})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_enquiries(request):
    try:
        enquiries = Enquiry.objects.all()
        serializer = EnquirySerializer(enquiries, many=True)
        return Response({'status': 'success', 'data': serializer.data})
    except Exception as e:
        return Response({'status': 'error', 'message': str(e)})


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_enquiry_status(request, id):
    try:
        enquiry = Enquiry.objects.get(id=id)
        status = request.data.get('status')
        if status not in ["Pending", "Approved", "Rejected"]:
            return Response({'status': 'error', 'message': 'Invalid status'}, status=400)

        enquiry.status = status
        enquiry.save()

        serializer = EnquirySerializer(enquiry)
        return Response({'status': 'success', 'data': serializer.data})
    except Enquiry.DoesNotExist:
        return Response({'status': 'error', 'message': 'Enquiry not found'}, status=404)
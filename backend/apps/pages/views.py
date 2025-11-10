from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from .models import PageContent
from .serializers import PageContentSerializer





@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_page_content(request, page_name):
    try:
        page = PageContent.objects.filter(page_name=page_name).first()
        if not page:
            return Response({'status': 'error', 'message': 'Page not found'}, status=404)
        serializer = PageContentSerializer(page)
        return Response({'status': 'success', 'data': serializer.data})
    except Exception as e:
        return Response({'status': 'error', 'message': str(e)}, status=500)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def update_page_content(request, page_name):
    try:
        page, created = PageContent.objects.get_or_create(page_name=page_name)
        serializer = PageContentSerializer(page, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'success', 'data': serializer.data})
        return Response({'status': 'error', 'message': serializer.errors}, status=400)
    except Exception as e:
        return Response({'status': 'error', 'message': str(e)}, status=500)

from django.urls import path
from .views import get_page_content, update_page_content



urlpatterns = [
    path('page/<str:page_name>/', get_page_content, name='get_page_content'),
    path('page/<str:page_name>/update/', update_page_content, name='update_page_content'),
]

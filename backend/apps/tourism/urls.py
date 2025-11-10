from django.urls import path
from . import views

urlpatterns = [
    # Categories
    path('categories/', views.list_categories, name='list_categories'),
    path('categories/create/', views.create_category, name='create_category'),
    path('categories/update/<int:category_id>/', views.update_category, name='update_category'),
    path('categories/delete/<int:category_id>/', views.delete_category, name='delete_category'),

    # Services
    path('services/', views.list_services, name='list_services'),
    path('services/create/', views.create_service, name='create_service'),
    path('services/update/<int:service_id>/', views.update_service, name='update_service'),
    path('services/delete/<int:service_id>/', views.delete_service, name='delete_service'),
    path('services/', views.list_services, name='list_services'),

    # Enquiries
    path('enquiries/submit/', views.submit_trip_enquiry, name='submit_enquiry'),
    path('enquiries/', views.list_enquiries, name='list_enquiries'),\
    path('enquiries/<int:id>/update_status/', views.update_enquiry_status, name='update_enquiry_status'),
]

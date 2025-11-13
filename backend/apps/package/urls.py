# app/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('packages/', views.package_list, name='package-list'),
    path('packages/<int:pk>/', views.package_detail, name='package-detail'),
    path('categories/', views.category_list, name='category-list'),
    path('bookings/create/', views.create_booking, name='create-booking'),
    path('bookings/list/', views.list_bookings, name='list-booking'),
    path('bookings/<int:booking_id>/confirm/', views.confirm_booking),
    path('bookings/<int:booking_id>/reject/', views.reject_booking),
]
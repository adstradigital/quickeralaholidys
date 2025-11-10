from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('users/', views.list_users, name='list_users'),
    path('users/create/', views.create_user, name='create_user'),
    path('users/toggle-status/<int:user_id>/', views.toggle_user_status, name='toggle-status'),
    path('users/update/<int:user_id>/', views.update_user, name='update-user'),
    path('users/delete/<int:user_id>/', views.delete_user, name='delete-user'),
    path('users/signin/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
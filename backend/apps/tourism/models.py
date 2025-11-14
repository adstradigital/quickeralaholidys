# apps/tourism/models.py
from django.db import models
from apps.users.models import User

class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Service(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="services/", blank=True, null=True)  # keep a main image if needed
    custom_fields = models.JSONField(blank=True, null=True)  # for extra dynamic data

    def __str__(self):
        return self.title


class ServiceImage(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="services/multiple/")

    def __str__(self):
        return f"Image for {self.service.title}"


class Enquiry(models.Model):
    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Approved", "Approved"),
        ("Rejected", "Rejected"),
    ]

    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=200, null=True, blank=True)
    email = models.EmailField()
    message = models.TextField()
    service = models.CharField(max_length=500, null=True, blank=True)  # Made optional
    product = models.CharField(max_length=200, blank=True, null=True)
    destination = models.CharField(max_length=200, blank=True, null=True)  # Add this field
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Pending")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.status}"
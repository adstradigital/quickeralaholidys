from django.db import models

class PageContent(models.Model):
    PAGE_CHOICES = [
        ('home', 'Home'),
        ('about', 'About'),
        ('services', 'Services'),
        ('contact', 'Contact'),
        ('enquiry', 'Enquiry'),
        ('testimonials', 'Testimonials'),
        ('dashboard', 'Dashboard'),
    ]

    page_name = models.CharField(max_length=50, choices=PAGE_CHOICES, unique=True)
    content = models.JSONField(default=dict, blank=True)  # Dynamic structured content
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.page_name

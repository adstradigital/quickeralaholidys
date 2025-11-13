from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth import get_user_model
from decimal import Decimal, ROUND_HALF_UP
from apps.tourism.models import Category
User = get_user_model()


# class Category(models.Model):
#     """Model for package categories"""
#     id = models.SlugField(max_length=50, primary_key=True)  # Using slug for string-based IDs
#     name = models.CharField(max_length=100)
#     icon = models.CharField(max_length=10, blank=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     class Meta:
#         db_table = 'categories'
#         verbose_name_plural = 'Categories'

#     def __str__(self):
#         return self.name


class Package(models.Model):
    """Model for travel packages"""
    title = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='packages')
    days = models.IntegerField(validators=[MinValueValidator(1)])
    nights = models.IntegerField(validators=[MinValueValidator(0)])
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    image = models.ImageField(upload_to='packages/', blank=True, null=True)
    rating = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        validators=[MinValueValidator(0), MaxValueValidator(5)],
        default=0
    )
    reviews_count = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'packages'
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    @property
    def discount_amount(self):
         """Return rounded discount value"""
         if self.original_price is None or self.price is None:
             return Decimal('0.00')
         return (self.original_price - self.price).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)

    @property
    def discount_percentage(self):
         """Return percentage discount"""
         if not self.original_price or not self.price:
             return Decimal('0.00')
         if self.original_price > 0:
             discount = ((self.original_price - self.price) / self.original_price) * 100
             return discount.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)
         return Decimal('0.00')

class PackageHighlight(models.Model):
    """Model for package highlights"""
    package = models.ForeignKey(Package, on_delete=models.CASCADE, related_name='highlights')
    text = models.CharField(max_length=200)
    order = models.IntegerField(default=0)

    class Meta:
        db_table = 'package_highlights'
        ordering = ['order']

    def __str__(self):
        return f"{self.package.title} - {self.text}"


class Itinerary(models.Model):
    """Model for package itinerary"""
    package = models.ForeignKey(Package, on_delete=models.CASCADE, related_name='itineraries')
    day = models.IntegerField(validators=[MinValueValidator(1)])
    title = models.CharField(max_length=200)
    accommodation = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'itineraries'
        ordering = ['day']
        unique_together = ['package', 'day']

    def __str__(self):
        return f"{self.package.title} - Day {self.day}"


class ItineraryActivity(models.Model):
    """Model for itinerary activities"""
    itinerary = models.ForeignKey(Itinerary, on_delete=models.CASCADE, related_name='activities')
    activity = models.CharField(max_length=300)
    order = models.IntegerField(default=0)

    class Meta:
        db_table = 'itinerary_activities'
        ordering = ['order']

    def __str__(self):
        return self.activity


class ItineraryMeal(models.Model):
    """Model for itinerary meals"""
    MEAL_CHOICES = [
        ('breakfast', 'Breakfast'),
        ('lunch', 'Lunch'),
        ('dinner', 'Dinner'),
    ]
    
    itinerary = models.ForeignKey(Itinerary, on_delete=models.CASCADE, related_name='meals')
    meal_type = models.CharField(max_length=20, choices=MEAL_CHOICES)

    class Meta:
        db_table = 'itinerary_meals'

    def __str__(self):
        return f"{self.itinerary} - {self.get_meal_type_display()}"


class Inclusion(models.Model):
    """Model for package inclusions"""
    package = models.ForeignKey(Package, on_delete=models.CASCADE, related_name='inclusions')
    inclusion_type = models.CharField(max_length=100)
    details = models.TextField()

    class Meta:
        db_table = 'inclusions'
        verbose_name_plural = 'Inclusions'

    def __str__(self):
        return f"{self.package.title} - {self.inclusion_type}"


class Exclusion(models.Model):
    """Model for package exclusions"""
    package = models.ForeignKey(Package, on_delete=models.CASCADE, related_name='exclusions')
    item = models.CharField(max_length=300)

    class Meta:
        db_table = 'exclusions'
        verbose_name_plural = 'Exclusions'

    def __str__(self):
        return self.item


class Review(models.Model):
    """Model for package reviews"""
    package = models.ForeignKey(Package, on_delete=models.CASCADE, related_name='reviews')
    name = models.CharField(max_length=100)
    rating = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    comment = models.TextField()
    verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'reviews'
        ordering = ['-created_at']
        verbose_name_plural = 'Reviews'

    def __str__(self):
        return f"{self.name} - {self.package.title}"


class GalleryImage(models.Model):
    """Model for package gallery images"""
    package = models.ForeignKey(Package, on_delete=models.CASCADE, related_name='gallery_images')
    image = models.ImageField(upload_to='gallery/')
    alt_text = models.CharField(max_length=200)
    order = models.IntegerField(default=0)

    class Meta:
        db_table = 'gallery_images'
        ordering = ['order']
        verbose_name_plural = 'Gallery Images'

    def __str__(self):
        return f"{self.package.title} - {self.alt_text}"




class Booking(models.Model):
    """Model for package bookings"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    ]

    # Package and User Relations
    package = models.ForeignKey('Package', on_delete=models.CASCADE, related_name='bookings', null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings', null=True, blank=True)
    
    # Personal Information (nullable for migration)
    first_name = models.CharField(max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    address = models.TextField(null=True, blank=True)  # Made nullable
    country = models.CharField(max_length=50, default='India')
    
    # Travel Details (nullable for migration)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    adults = models.IntegerField(default=1, validators=[MinValueValidator(1)])
    children = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    
    # Custom Tour Details (for bookings without package)
    custom_destination = models.CharField(max_length=200, blank=True, null=True)
    custom_preferences = models.TextField(blank=True, null=True)
    
    # Special Requests
    special_requests = models.TextField(blank=True, null=True)
    
    # Pricing (nullable for migration)
    base_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    promo_code = models.CharField(max_length=50, blank=True, null=True)
    promo_discount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    package_discount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    taxes = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Booking Status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'bookings'
        ordering = ['-created_at']
        verbose_name_plural = 'Bookings'

    def __str__(self):
        if self.package:
            return f"{self.first_name or 'Guest'} {self.last_name or ''} - {self.package.title}"
        return f"{self.first_name or 'Guest'} {self.last_name or ''} - Custom Tour to {self.custom_destination or 'Unknown'}"

    @property
    def full_name(self):
        """Return full name"""
        return f"{self.first_name or ''} {self.last_name or ''}".strip() or 'Guest'

    @property
    def total_travelers(self):
        """Return total travelers count"""
        return (self.adults or 0) + (self.children or 0)
    
    @property
    def duration_days(self):
        """Calculate duration in days"""
        if self.start_date and self.end_date:
            return (self.end_date - self.start_date).days + 1  # Include both start and end day
        return 0

    def calculate_pricing(self, promo_discount_amount=0):
        """Calculate all pricing fields"""
        if self.package:
            # Package booking
            base_price = Decimal(self.package.price) * self.adults + Decimal(self.package.price) * Decimal('0.7') * self.children
            package_discount = 0
            if hasattr(self.package, 'original_price') and self.package.original_price:
                package_discount = (Decimal(self.package.original_price) - Decimal(self.package.price)) * self.adults
        else:
            # Custom booking - estimate based on duration and travelers
            duration = self.duration_days if self.duration_days > 0 else 1
            base_price = Decimal('2500') * duration * (self.adults + self.children * Decimal('0.7'))
            package_discount = 0
        
        self.base_price = base_price
        self.package_discount = package_discount
        self.promo_discount = Decimal(promo_discount_amount)
        self.subtotal = base_price - self.promo_discount
        self.taxes = self.subtotal * Decimal('0.18')
        self.total_price = self.subtotal + self.taxes
        
    def save(self, *args, **kwargs):
        """Override save to calculate pricing before saving"""
        if self.total_price == 0 or not self.base_price:
            self.calculate_pricing()
        super().save(*args, **kwargs)



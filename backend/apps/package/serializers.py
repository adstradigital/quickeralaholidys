# app/serializers.py
from rest_framework import serializers
from .models import (
    Category, Package, PackageHighlight, Itinerary, ItineraryActivity,
    ItineraryMeal, Inclusion, Exclusion, Review, GalleryImage, Booking
)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class PackageHighlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackageHighlight
        fields = ['text', 'order']


class ItineraryActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = ItineraryActivity
        fields = ['activity', 'order']


class ItineraryMealSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItineraryMeal
        fields = ['meal_type']


class ItinerarySerializer(serializers.ModelSerializer):
    activities = ItineraryActivitySerializer(many=True, read_only=True)
    meals = ItineraryMealSerializer(many=True, read_only=True)

    class Meta:
        model = Itinerary
        fields = ['day', 'title', 'accommodation', 'activities', 'meals']


class InclusionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inclusion
        fields = ['inclusion_type', 'details']


class ExclusionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exclusion
        fields = ['item']


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['name', 'rating', 'comment', 'verified', 'created_at']


class GalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImage
        fields = ['image', 'alt_text', 'order']


class PackageSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    highlights = PackageHighlightSerializer(many=True, read_only=True)
    itineraries = ItinerarySerializer(many=True, read_only=True)
    inclusions = InclusionSerializer(many=True, read_only=True)
    exclusions = ExclusionSerializer(many=True, read_only=True)
    gallery_images = GalleryImageSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Package
        fields = '__all__'


class BookingSerializer(serializers.ModelSerializer):
    full_name = serializers.ReadOnlyField()
    total_travelers = serializers.ReadOnlyField()
    duration_days = serializers.ReadOnlyField()
    package_name = serializers.SerializerMethodField()
    total_amount = serializers.SerializerMethodField()

    class Meta:
        model = Booking
        fields = '__all__'

    # Package name logic
    def get_package_name(self, obj):
        if obj.package:
            return obj.package.title  # or obj.package.name depending on your model
        return obj.custom_destination or "Custom Tour"

    # Total amount logic
    def get_total_amount(self, obj):
        try:
            return float(obj.total_price or 0)
        except:
            return 0

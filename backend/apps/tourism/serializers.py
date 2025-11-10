from rest_framework import serializers
from .models import Category, Service, Enquiry, ServiceImage

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ServiceImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = ServiceImage
        fields = ["id", "image"]

# serializers.py
class ServiceSerializer(serializers.ModelSerializer):
    images = ServiceImageSerializer(many=True, read_only=True)
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), write_only=True
    )
    category_data = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Service
        fields = [
            "id",
            "title",
            "description",
            "category",       # accept category id when creating/updating
            "category_data",  # show {id, name} when reading
            "image",
            "custom_fields",
            "images",
        ]

    def get_category_data(self, obj):
        return {"id": obj.category.id, "name": obj.category.name}




class EnquirySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Enquiry
        fields = '__all__'
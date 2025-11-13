from django.contrib import admin
from .models import Category, Service, ServiceImage, Enquiry


# ==============================
# Inline for multiple images
# ==============================
class ServiceImageInline(admin.TabularInline):
    model = ServiceImage
    extra = 1
    fields = ('image',)
    show_change_link = True


# ==============================
# Category Admin
# ==============================
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)
    ordering = ('name',)
    list_per_page = 20


# ==============================
# Service Admin
# ==============================
@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'short_description')
    search_fields = ('title', 'description', 'category__name')
    list_filter = ('category',)
    inlines = [ServiceImageInline]
    list_per_page = 20
    fieldsets = (
        ("Service Info", {
            'fields': ('title', 'description', 'category', 'image')
        }),
        ("Advanced", {
            'fields': ('custom_fields',),
            'classes': ('collapse',),
        }),
    )

    def short_description(self, obj):
        """Show shortened description in list"""
        return (obj.description[:75] + "...") if len(obj.description) > 75 else obj.description
    short_description.short_description = "Description"


# ==============================
# Enquiry Admin
# ==============================
@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'service', 'product', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('name', 'email', 'phone', 'service', 'product')
    readonly_fields = ('created_at',)
    list_editable = ('status',)
    ordering = ('-created_at',)
    list_per_page = 30

    fieldsets = (
        ("Enquiry Details", {
            'fields': ('name', 'email', 'phone', 'message', 'service', 'product')
        }),
        ("Status & Timestamps", {
            'fields': ('status', 'created_at')
        }),
    )

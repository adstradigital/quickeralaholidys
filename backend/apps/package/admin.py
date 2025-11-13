# from django.contrib import admin
# from .models import (
#     Package, PackageHighlight, Itinerary, ItineraryActivity, ItineraryMeal,
#     Inclusion, Exclusion, Review, GalleryImage, Booking
# )

# # ==============================
# # Inline Admins
# # ==============================

# class PackageHighlightInline(admin.TabularInline):
#     model = PackageHighlight
#     extra = 1
#     fields = ('text', 'order')
#     ordering = ('order',)


# class ItineraryActivityInline(admin.TabularInline):
#     model = ItineraryActivity
#     extra = 1
#     fields = ('activity', 'order')
#     ordering = ('order',)


# class ItineraryMealInline(admin.TabularInline):
#     model = ItineraryMeal
#     extra = 1
#     fields = ('meal_type',)


# class ItineraryInline(admin.StackedInline):
#     model = Itinerary
#     extra = 1
#     show_change_link = True
#     fields = ('day', 'title', 'accommodation')
#     ordering = ('day',)
#     inlines = [ItineraryActivityInline, ItineraryMealInline]


# class InclusionInline(admin.TabularInline):
#     model = Inclusion
#     extra = 1
#     fields = ('inclusion_type', 'details')


# class ExclusionInline(admin.TabularInline):
#     model = Exclusion
#     extra = 1
#     fields = ('item',)


# class GalleryImageInline(admin.TabularInline):
#     model = GalleryImage
#     extra = 1
#     fields = ('image', 'alt_text', 'order')
#     ordering = ('order',)


# # ==============================
# # Package Admin
# # ==============================

# @admin.register(Package)
# class PackageAdmin(admin.ModelAdmin):
#     list_display = ('title', 'category', 'price', 'original_price', 'discount_percentage', 'rating', 'is_active')
#     list_filter = ('category', 'is_active', 'created_at')
#     search_fields = ('title', 'category__name', 'description')
#     list_editable = ('is_active',)
#     readonly_fields = ('created_at', 'updated_at', 'discount_amount', 'discount_percentage')
#     inlines = [PackageHighlightInline, InclusionInline, ExclusionInline, GalleryImageInline]
#     fieldsets = (
#         ("Basic Info", {
#             'fields': ('title', 'category', 'description', 'image')
#         }),
#         ("Pricing", {
#             'fields': ('original_price', 'price', 'discount_amount', 'discount_percentage')
#         }),
#         ("Details", {
#             'fields': ('days', 'nights', 'rating', 'reviews_count', 'is_active')
#         }),
#         ("Timestamps", {
#             'fields': ('created_at', 'updated_at')
#         }),
#     )


# # ==============================
# # Itinerary Admin
# # ==============================

# @admin.register(Itinerary)
# class ItineraryAdmin(admin.ModelAdmin):
#     list_display = ('package', 'day', 'title', 'accommodation')
#     list_filter = ('package',)
#     search_fields = ('package__title', 'title')
#     inlines = [ItineraryActivityInline, ItineraryMealInline]
#     ordering = ('package', 'day')


# # ==============================
# # Review Admin
# # ==============================

# @admin.register(Review)
# class ReviewAdmin(admin.ModelAdmin):
#     list_display = ('package', 'name', 'rating', 'verified', 'created_at')
#     list_filter = ('verified', 'rating', 'created_at')
#     search_fields = ('package__title', 'name', 'comment')
#     list_editable = ('verified',)
#     readonly_fields = ('created_at',)


# # ==============================
# # Booking Admin
# # ==============================

# @admin.register(Booking)
# class BookingAdmin(admin.ModelAdmin):
#     list_display = ('package', 'name', 'email', 'phone', 'selected_date', 'status', 'total_price')
#     list_filter = ('status', 'selected_date', 'created_at')
#     search_fields = ('package__title', 'name', 'email', 'phone')
#     readonly_fields = ('created_at', 'updated_at', 'total_travelers')
#     fieldsets = (
#         ("Booking Info", {
#             'fields': ('package', 'user', 'status')
#         }),
#         ("Traveler Details", {
#             'fields': ('name', 'email', 'phone', 'selected_date', 'adults', 'children', 'infants', 'total_travelers')
#         }),
#         ("Payment", {
#             'fields': ('total_price',)
#         }),
#         ("Special Requests", {
#             'fields': ('special_requests',)
#         }),
#         ("Timestamps", {
#             'fields': ('created_at', 'updated_at')
#         }),
#     )


# # ==============================
# # Simple Models
# # ==============================

# @admin.register(Inclusion)
# class InclusionAdmin(admin.ModelAdmin):
#     list_display = ('package', 'inclusion_type')
#     search_fields = ('package__title', 'inclusion_type')
#     list_filter = ('package',)


# @admin.register(Exclusion)
# class ExclusionAdmin(admin.ModelAdmin):
#     list_display = ('package', 'item')
#     search_fields = ('package__title', 'item')
#     list_filter = ('package',)


# @admin.register(GalleryImage)
# class GalleryImageAdmin(admin.ModelAdmin):
#     list_display = ('package', 'alt_text', 'order')
#     ordering = ('package', 'order')


# @admin.register(PackageHighlight)
# class PackageHighlightAdmin(admin.ModelAdmin):
#     list_display = ('package', 'text', 'order')
#     ordering = ('package', 'order')

from django.contrib import admin
from shopping_api.models import ItemModel, CartModel, CartDetailsModel

# Register your models here.
admin.site.register(ItemModel)
admin.site.register(CartModel)
admin.site.register(CartDetailsModel)

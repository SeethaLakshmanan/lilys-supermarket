from django.urls import path
from shopping_api.views import SaveOrderView, LoadItemsView, LoadOrdersView, LoadFruitsView, LoadVeggiesView

app_name = "shopping_api"

urlpatterns = [
    path('saveOrder', SaveOrderView.as_view(), name='saveOrder'),
    path('loadItems', LoadItemsView.as_view(), name='loadItems'),
    path('loadFruits', LoadFruitsView.as_view(), name='loadFruits'),
    path('loadVeggies', LoadVeggiesView.as_view(), name='loadVeggies'),
    path('loadOrders', LoadOrdersView.as_view(), name='loadOrders')
]

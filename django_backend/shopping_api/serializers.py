from rest_framework import serializers
from shopping_api.models import ItemModel, CartModel, CartDetailsModel


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemModel
        fields = ['id', 'name', 'price', 'category']

    def create(self, data):
        item = ItemModel.objects.create(
            id=data['id'],
            name=data['name'],
            price=data['price'],
            category=data['category'],
        )
        item.save()
        return item


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartModel
        fields = ['total', 'userId']

    def create(self, data):
        cart = CartModel.objects.create(
            total=data['total'],
            userId=data['userId'],
        )
        cart.save()
        return cart


class CartDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartDetailsModel
        fields = ['itemId', 'cartId', 'numOfItems', 'calcPrice']

    def create(self, data):
        cart_details = CartDetailsModel.objects.create(
            itemId=data['itemId'],
            cartId=data['cartId'],
            numOfItems=data['numOfItems'],
            calcPrice=data['calcPrice'],
        )
        cart_details.save()
        return cart_details

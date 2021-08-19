from django.db import connections
from rest_framework.response import Response
from rest_framework.views import APIView

from shopping_api.serializers import ItemSerializer, CartSerializer, CartDetailsSerializer
from shopping_api.models import ItemModel, CartModel, CartDetailsModel


class SaveOrderView(APIView):
    def post(self, request):
        # First save the cart table and get the id created
        cart = dict()
        cart['userId'] = request.data['userId']
        cart['total'] = request.data['total']

        cart_serializer = CartSerializer(data=cart)
        if cart_serializer.is_valid():
            my_cart = cart_serializer.save()
            print(" cart id: ")
            print(my_cart.id)

            # Now save the cart details using that id
            response_data = self.helper(my_cart.id, request.data['cart_details'])
        else:
            response_data = cart_serializer.errors
        return Response(response_data)

    def helper(self, cart_id, cart_details):
        cart_list = []
        for detail in cart_details:
            cart_dict = dict()
            cart_dict['itemId'] = detail['itemId']
            cart_dict['cartId'] = cart_id
            cart_dict['numOfItems'] = detail['quantity']
            cart_dict['calcPrice'] = detail['calcPrice']
            cart_list.append(cart_dict)

        serializer = CartDetailsSerializer(data=cart_list, many=True)
        response_data = {}
        if serializer.is_valid():
            serializer.save()
            response_data['response'] = 'cart details saved'
        else:
            response_data = serializer.errors
        return response_data


class LoadItemsView(APIView):
    def post(self, request):
        items = ItemModel.objects.all()
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)

class LoadFruitsView(APIView):
    def post(self, request):
        items = ItemModel.objects.all()
        # filter fruits
        fruits = [i for i in items if i.category=="fruits"]
        serializer = ItemSerializer(fruits, many=True)
        return Response(serializer.data)

class LoadVeggiesView(APIView):
    def post(self, request):
        items = ItemModel.objects.all()
        # filter veggies
        veggies = [i for i in items if i.category=="vegetables"]
        serializer = ItemSerializer(veggies, many=True)
        return Response(serializer.data)


class LoadOrdersView(APIView):
    # Filter Cart by userid
    # Filter CartDetails by cartid of each cart

    def post(self, request):
        response_data = {}
        carts = \
            CartModel.objects.filter(userId=request.data['userId'])
        if carts.count() < 1:
            return Response({})
        count = 0
        for cart in carts:
            details = CartDetailsModel.objects.filter(cartId=cart.id)
            serializer = CartDetailsSerializer(details, many=True)
            response_data["order"+str(count)] =\
                {"cartDetails": serializer.data,
                 "createdAt": cart.created_at,
                 "total": cart.total}
            count += 1

        return Response(response_data)

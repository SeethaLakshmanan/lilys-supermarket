from django.db import models
from login_api.models import UsersModel


# Create your models here.
class ItemModel(models.Model):
    id = models.IntegerField(verbose_name='id', primary_key=True)
    name = models.CharField(verbose_name='name', max_length=50)
    price = models.DecimalField(verbose_name='price', decimal_places=2, max_digits=7)
    category = models.CharField(verbose_name='category', max_length=50)
    # image = models.ImageField()


class CartModel(models.Model):
    total = models.DecimalField(verbose_name='total', decimal_places=2, max_digits=7)
    userId = models.ForeignKey(UsersModel, to_field='id', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class CartDetailsModel(models.Model):
    itemId = models.ForeignKey(ItemModel, to_field='id', on_delete=models.CASCADE)
    cartId = models.ForeignKey(CartModel, to_field='id', on_delete=models.CASCADE)
    numOfItems = models.IntegerField(verbose_name='numOfItems')
    calcPrice = models.DecimalField(verbose_name='calcPrice', decimal_places=2, max_digits=7)

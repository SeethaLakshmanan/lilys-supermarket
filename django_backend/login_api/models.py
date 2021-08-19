from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from rest_framework.authtoken.models import Token


# class for creating the user
class UsersManager(BaseUserManager):
    def create_user(self, first_name, last_name, email, password):
        if not email:
            raise ValueError("User must enter email address")
        if not first_name:
            raise ValueError("User must enter first name")
        if not last_name:
            raise ValueError("User must enter last name")
        if not password:
            raise ValueError("User must enter password")

        user = self.model(first_name=first_name,
                          last_name=last_name,
                          email=self.normalize_email(email))

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, first_name, last_name, email, password):
        # Todo: Update password property based on how Admin will be created later,
        # for now asking password when creating superuser so that it is convenient for testing
        user = self.create_user(first_name=first_name,
                                last_name=last_name,
                                email=self.normalize_email(email),
                                password=password)

        user.is_admin = True
        user.is_staff = True
        user.save(using=self._db)
        return user


# class defining the user model and the fields
class UsersModel(AbstractBaseUser):
    first_name = models.CharField(verbose_name='first_name', max_length=50)
    last_name = models.CharField(verbose_name='last_name', max_length=50)
    email = models.EmailField(verbose_name='email', max_length=50, unique=True)
    password = models.CharField(verbose_name='password', max_length=32)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'password']

    objects = UsersManager()

    def __str__(self):
        return self.email  # temp, to be modified later

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

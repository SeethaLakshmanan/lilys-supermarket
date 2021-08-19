# Lily's Supermarket

A simple shopping cart example with ReactJS (created using [create-react-app](https://github.com/facebook/create-react-app)) and Redux for web frontend and Django for backend. The REST API is created with Django REST framework.

## Features:

1. Login
2. Signup

### Without logging in:

1. View available products
2. Add products to cart

### After logging in:

1. Place order (i.e checkout the items in the cart)
2. View past orders

## Installation guide

### Web frontend

In the ReactJS project directory:

1. To install dependencies:

```
npm install
```

2. To start the app:

```
npm start
```

### Django backend

Create a Python virtual environment, activate it and install Django.
(https://docs.djangoproject.com/en/3.2/intro/install/)

In the Django project directory:

1. To migrate:

```
python manage.py makemigrations
```

```
python manage.py migrate
```

2. To load the data:

```
python manage.py loaddata fixtures/items.json
```

Example of an item in items.json:

```
{
"id": 1,
"name": "Banana",
"price": "0.99",
"category": "fruits"
}
```

3. To run the server:

```
python manage.py runserver 0.0.0.0:8000
```

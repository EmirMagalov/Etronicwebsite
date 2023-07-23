from django.urls import path
from . import views
urlpatterns = [
    path('',views.main,name="main"),
    path('tovar/<int:pk>',views.opis,name="opis"),
    path("categ/<int:pk>",views.categoria,name="categ"),
    path("model",views.model,name="model"),
    path("basket",views.basket,name="basket"),
    path("plus", views.plus, name="plus"),
    path("minus",views.minus,name="minus"),
    path("del",views.delit,name="del"),
    path("addform",views.addform,name="addform"),
    path("addform2/<int:pk>",views.addform2,name="addform2"),
    path("delform",views.delform,name="delform")

]
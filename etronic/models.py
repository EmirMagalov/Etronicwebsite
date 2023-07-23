from django.db import models



class Categoria(models.Model):
    categoria=models.CharField(max_length=150)
    def __str__(self):
        return self.categoria

class Model(models.Model):
    title = models.CharField(max_length=150)
    model = models.ForeignKey(Categoria, on_delete=models.PROTECT, null=True)
    def __str__(self):
        return self.title
class Goods(models.Model):
    descr=models.TextField()
    name=models.CharField(max_length=150)
    price=models.IntegerField()
    photo1=models.ImageField(upload_to="images/")
    photo2=models.ImageField(upload_to="images/")
    categoria=models.ForeignKey(Categoria,on_delete=models.PROTECT,null=True)
    model = models.ForeignKey(Model, on_delete=models.PROTECT, null=True)
    skidki=models.FloatField(blank=True,null=True)

    def __str__(self):
        return self.name

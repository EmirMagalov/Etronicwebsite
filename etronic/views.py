from django.shortcuts import render, redirect
from .models import Goods,Categoria,Model
from .forms import AddForm
categ = Categoria.objects.all()



def main(request):
    tovar=Goods.objects.all().order_by("-id")[0:6]
    add={"tovar":tovar,"categ":categ}
    return render(request,"etronic/main.html",add)

def opis(request,pk):
    tovar=Goods.objects.get(pk=pk)
    rec=Goods.objects.raw(f"SELECT * FROM etronic_goods WHERE model_id={tovar.model.id} AND id!={pk}")
    model=Model.objects.filter(model_id=tovar.categoria.id)
    add = {"tovarpk": tovar,"rec":rec,"categ":categ,"model":model}
    return render(request, "etronic/pk.html", add)


def categoria(request,pk):
    categpk=Goods.objects.filter(categoria_id=pk)
    model=Model.objects.filter(model_id=pk)

    add = {"categpk": categpk,"model":model,"categ":categ}
    return render(request, "etronic/categoria.html", add)


def model(request):
    if request.method=="GET":
        addget={
            "model":request.GET.getlist("model"),
            "modelid": request.GET.get("modelid")
        }
        m=Goods.objects.raw(f"SELECT * FROM etronic_goods WHERE model_id IN ({','.join(addget['model'])})")
        model = Model.objects.filter(model_id=addget["modelid"])
        add={"m":m,"categ":categ,"model":model}
        if addget["model"]==[]:
            return redirect(request.META.get('HTTP_REFERER'))
        else:
            return render(request,"etronic/model.html",add)


def basket(request):
    if request.method=="GET":
        add={
            "name":request.GET.get("name"),
            "id": request.GET.get("id"),
            "photo": request.GET.get("photo"),
            "price": int(request.GET.get("price")),
            "quan": int(request.GET.get("quan")),
        }

        if not request.session.get("basket"):

            request.session["basket"]=list()
            # list(request.session["basket"])

        else:
            request.session["basket"]=list(request.session["basket"])[::-1]
        item=next((i for i in request.session["basket"] if add["name"]==i["name"]),False)

        if not item:
            request.session["basket"].append(add)

            # request.session.modified=True
        if item:
            for i in request.session["basket"]:
                if i["name"]==add["name"]:
                    if i["quan"] <10:
                        f=10-i["quan"]
                        if add["quan"]<=f:
                            i["quan"]+=add["quan"]
                        else:
                            i["quan"] += f
        request.session["basket"]=list(reversed( request.session["basket"]))
        request.session.modified = True

    return redirect(request.META.get('HTTP_REFERER'))



def plus(request):
    if request.method=="GET":
        add={
            "name":request.GET.get("name"),

        }


        for i in request.session["basket"]:
            if i["name"]==add["name"]:
                if i["quan"]<10:
                    i["quan"]+=1
            request.session.modified = True
    return redirect(request.META.get('HTTP_REFERER'))


def minus(request):
    if request.method=="GET":
        add={
            "name":request.GET.get("name"),

        }

        for i in request.session["basket"]:
            if i["name"]==add["name"]:
                if i["quan"]>1:

                    i["quan"]-=1
            request.session.modified = True
    return redirect(request.META.get('HTTP_REFERER'))

def delit(request):
    if request.method=="GET":
        add = {
            "name": request.GET.get("name"),

        }
        print(add["name"])
        for i in request.session["basket"]:
            if i["name"]==add["name"]:
                i.clear()
        while {} in request.session["basket"]:
            request.session["basket"].remove({})

        request.session.modified=True
    return redirect(request.META.get('HTTP_REFERER'))


def addform(request):
    if request.user.is_superuser:
        if request.method == "POST":
            form = AddForm(request.POST,request.FILES)
            if form.is_valid():
                form.save()
                return redirect(request.META.get('HTTP_REFERER'))

        else:
            form = AddForm()
        prod=Goods.objects.all().order_by("-id")
        categ=Categoria.objects.all()
        return render(request, "etronic/addform.html", {"form": form,"prod":prod,"categ":categ})
    else:
        return redirect("main")
def addform2(request,pk):
    prod=Goods.objects.filter(categoria_id=pk).order_by("-id")
    form = AddForm()
    categ = Categoria.objects.all()
    return render(request, "etronic/addform.html", {"form": form, "prod": prod, "categ": categ})



def delform(request):
    if request.method == "POST":
        delit=request.POST.get("pk")
        prod=Goods.objects.filter(pk=delit)
        prod.delete()
    return redirect(request.META.get('HTTP_REFERER'))




function CardPrice(){
bb=document.querySelectorAll(".b")
n=0
bb.forEach(f=>{
f.querySelector(".price").innerText=parseInt(f.querySelector(".pricenone").innerText)*parseInt(f.querySelector(".quan").innerText)
n=n+parseInt(f.querySelector(".price").innerText)
document.querySelector(".kalk").innerText=n
console.log(n)
})
}

CardPrice()


add=document.querySelector(".basket")
mod=document.querySelector(".model")
window.addEventListener("click",f=>{
if(f.target.dataset.action=="open"){
mod.style.width="200px";


}
else if(f.target.dataset.action=="close"){
mod.style.width="0px"
}

else if(f.target.dataset.action=="shop"){
document.querySelector(".slaider").style.width="365px"
}
else if(f.target.dataset.action=="closebasket"){
document.querySelector(".slaider").style.width="0px"
}

else if(f.target.dataset.action=="plus"){
if(document.querySelector(".quan").innerText<10){
document.querySelector(".bprice").innerText=parseInt(document.querySelector(".bprice").innerText)+parseInt(document.querySelector(".pricenone").innerText)
document.querySelector(".quan").innerText=++document.querySelector(".quan").innerText
document.querySelector(".quanval").value=document.querySelector(".quan").innerText
document.querySelector(".priceval").value=document.querySelector(".bprice").innerText
}
}
else if(f.target.dataset.action=="minus"){
q=f.target.closest("quan")
if(document.querySelector(".quan").innerText>1){
document.querySelector(".bprice").innerText=parseInt(document.querySelector(".bprice").innerText)-parseInt(document.querySelector(".pricenone").innerText)
document.querySelector(".quan").innerText=--document.querySelector(".quan").innerText
document.querySelector(".quanval").value=document.querySelector(".quan").innerText
document.querySelector(".priceval").value=document.querySelector(".bprice").innerText
}
}

else if(f.target.dataset.action=="plusbasket"){
bask=f.target.closest(".b")
form=bask.querySelector(".baskformPlus")
f.preventDefault()
$.ajax({
type:form.method,
url:form.action,
data:$(form).serialize(),
success:function(){
if(bask.querySelector(".quan").innerText<10){
bask.querySelector(".quan").innerText=++bask.querySelector(".quan").innerText
CardPrice()
}
}
})

}


else if(f.target.dataset.action=="minusbasket"){
bask=f.target.closest(".b")
form=bask.querySelector(".baskformMinus")
f.preventDefault()
$.ajax({
type:form.method,
url:form.action,
data:$(form).serialize(),
success:function(){
if(bask.querySelector(".quan").innerText>1){
bask.querySelector(".quan").innerText=--bask.querySelector(".quan").innerText
CardPrice()
}
}
})
}
else if(f.target.dataset.action=="del"){
bask=f.target.closest(".b")
form=bask.querySelector(".delform")
f.preventDefault()
$.ajax({
type:form.method,
url:form.action,
data:$(form).serialize(),
success:function(){
document.querySelector(".kalk").innerText=parseInt(document.querySelector(".kalk").innerText)-parseInt(bask.querySelector(".price").innerText)
bask.remove()

}
})


}





else if(f.target.dataset.action=="bask"){
col=f.target.closest(".get")
quan=col.querySelector(".quanval").value
document.querySelector(".slaider").style.width="365px"
form=col.querySelector(".basketform")
f.preventDefault()
$.ajax({
type:form.method,
url:form.action,
data:$(form).serialize(),
success:function(){

mass={
id:col.querySelector("[data-name='bpk']").innerText,
img:col.querySelector("[data-name='bimg'").getAttribute("src"),
name:col.querySelector("[data-name='bname']").innerText,
price:col.querySelector("[data-name='bprice']").innerText,
quan:col.querySelector(".quan").innerText,
}

const into=
`
<div class="b"  id="pk${mass.id}">
<div class="basketcard"  >
    <img class="image" src="${mass.img}" >
</div>
    <div class="basketcard">
<p class="name">${mass.name}</p>
<p class="price">${mass.price}</p>
<p style="display:none" class="pricenone">${mass.price}</p>
        </div>
  <div class="basketcard">
      <div class="kalkulate">
          <form action="/plus" class="baskformPlus" method="GET">

              <input type="hidden" name="name" class="nameval" value="${mass.name}">
            <p><button type="submit" data-action="plusbasket">+</button></p>
              </form>
      <p><button class="quan" >${mass.quan}</button></p>
            <form action="/minus" class="baskformMinus" method="GET">

              <input type="hidden" name="name" class="nameval" value="${mass.name}">
            <p><button type="submit" data-action="minusbasket">-</button></p>
              </form>
          </div>
          <form action="/del" class="delform" method="GET">
          <input name="name" type="hidden" value="${mass.name}">
      <button data-action="del" class="del" style="background-color:white;border:none;border-bottom:2px solid red;">Удалить</button>
      </form>
  </div>
  </div>
        `;

long=document.querySelector(`#pk${mass.id}`)

if(long){
if(long.querySelector(".quan").innerText<10){
 f=10-parseInt(long.querySelector(".quan").innerText)
   if (quan<= f){
    long.querySelector(".quan").innerText=parseInt(long.querySelector(".quan").innerText)+parseInt(quan)
    }
else{
    long.querySelector(".quan").innerText=parseInt(long.querySelector(".quan").innerText)+parseInt(f)
    }
//long.querySelector(".quan").innerText=parseInt(long.querySelector(".quan").innerText)+parseInt(quan)
//long.querySelector(".price").innerText=parseInt(long.querySelector(".price").innerText)+parseInt(long.querySelector(".pricenone").innerText)
}
}
else{
add.insertAdjacentHTML("afterbegin",into);

}
CardPrice()
}
})

}

})

try{
mass=document.querySelector(".descr")
var i = 0;
iii=mass.innerText.split("/")
ii=iii.length
console.log(ii)
while(i<ii){
a=mass.innerText.replace("/","\n")
mass.innerText=a
i++
}
}
catch(err) {
  console.log("Ok")
}



  Fancybox.bind('[data-fancybox="gallery"]', {
        Toolbar: {
          display: {
            left: [
              "",
            ],
            right:["close"]
            }
            }
})
try{

var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 4000); // Меняйте изображение каждые 2 секунды
}
}
catch(err) {
  console.log("Ok")
}

window.addEventListener("load",initevent);
var slideIndex = 1;
function initevent(){
    initdesign();
}
function load(){
    intro.style.display = "none"; 
    container.style.display = "initial"; 
    showDivs(slideIndex);
    document.getElementById("btn-clk0").addEventListener("click",minus);
    document.getElementById("btn-clk1").addEventListener("click",plus);
    showAllProducts();
    document.getElementById("search12").addEventListener("keyup",search);
    document.getElementById("search13").addEventListener("keyup",search);
    showDivs(slideIndex);
}
// ------------------------------------SLIDER-----------------------------
function minus(){
    plusDivs(-1);
}
function plus(){
    plusDivs(1);
}
function plusDivs(n) {
  showDivs(slideIndex += n);
}
function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("myslides");
    if (n > x.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = x.length}
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";  
    }
    x[slideIndex-1].style.display = "block";    
}
// -----------------------------SEARCH--------------------------------------------------------
// var tosearch = "";
// function show(sear){
//     tosearch = sear.value;
//     var serbtn = document.getElementById("searchbtn");
//     serbtn.addEventListener("click",search);
// }
// function search(){
//     console.log(tosearch);
// }
// -------------------------CONTENT---------------------------------------------
function showAllProducts(){
    var rupee=document.getElementById("rupee").innerHTML;
        var ul1 = document.getElementById("smartphones");
        var ul2 = document.getElementById("watches");
        var ul3 = document.getElementById("health");
        var ul4 = document.getElementById("footwear");
        ul1.innerHTML = "";
        ul2.innerHTML = "";
        ul3.innerHTML = "";
        ul4.innerHTML = "";
        for(var i = 0; i < products.length; i++){
            var li = document.createElement("li");
            li.className = 'product';
            li.setAttribute('title', products[i].p_id);
            // li.className = 'list-group-item product';
            var p_name = document.createElement("span");
            p_name.className = 'name';
            p_name.innerHTML = products[i].p_name;
            var p_price = document.createElement("span");
            p_price.className = 'price';
            var p_curr = document.createElement("span");
            p_curr.className = 'currency';
            p_curr.innerHTML = rupee;
            p_price.innerHTML = products[i].p_price;
            var p_image = document.createElement("img");
            p_image.className = 'productImage';
            p_image.setAttribute('src', products[i].p_image);
            var p_quantity = document.createElement("span");
            p_quantity.innerHTML = products[i].p_quantity;
            // console.log(p_quantity);
            p_quantity.className = 'pquan';
            var cart_button = document.createElement("button");
            cart_button.innerHTML = "Add to Cart";
            cart_button.className = 'cart-btn';
            li.appendChild(p_image);
            li.appendChild(p_name);
            li.appendChild(p_price);
            li.appendChild(p_curr);
            li.appendChild(cart_button);
            li.appendChild(p_quantity);
            var idcal = products[i].p_id/100;
            cal = parseInt(idcal);
            if( cal == 1)
            ul1.appendChild(li);
            if( cal == 2)
            ul2.appendChild(li);
            if( cal == 3)
            ul3.appendChild(li);
            if( cal == 4)
            ul4.appendChild(li);
            cart_button.addEventListener("click", add);
        }
    pbtn();
}
function pbtn(){
    var pbtn2 = document.getElementsByClassName("p-btn1");
    var pbtn1 = document.getElementsByClassName("p-btn0");
    for( var i = 0; i < pbtn2.length; i++){
        pbtn2[i].addEventListener("click", ptrrig);
        pbtn2[i].style.display = "initial";
        pbtn1[i].addEventListener("click", ptrlef);
    }
}
function ptrrig(){
    // console.log("executed");
    var m = event.srcElement.parentElement;
    var n = m.childNodes[3];
    var o = m.childNodes[5];
    m = m.childNodes[1];
    // console.log(m);
    m.className = 'btn-transform0';
    o.style.display = "none";
    n.style.display = "initial";
    // console.log("asdad",o);
}
function ptrlef(){
    // console.log("executed");
    var m = event.srcElement.parentElement;
    var n = m.childNodes[5];
    var o = m.childNodes[3];
    m = m.childNodes[1];
    // console.log(m);
    m.className = 'btn-transform1';
    o.style.display = "none";
    n.style.display = "initial";
}
function add(){
    var elem = event.srcElement.parentNode;
    console.log(elem);
    var product = elem.childNodes;
    var b = 5;
    var elemId = elem.title;
    // console.log(elemId);
    if(obj.itemList.length == 0){
        b = 0;
    }
    else{
        for(var i = 0; i < obj.itemList.length; i++){
            if(elemId == obj.itemList[i].id){
                b=1;
                break;
                // console.log("executed");
            }
            else{
            b=0;
            // console.log("executed111");
            }
        }
    }
    if(b == 0){
        console.log(product[5]);
        var h = product[5].innerHTML;
        h++;
        obj.addItem(elemId, product[1].innerHTML, product[2].innerHTML, product[0].src, h);
        cartCount();
        notify();
        saveChanges();
    }
    else if(b == 1){
        window.alert("product already in cart...");
    }
}

function cartCount(){
    count = obj.cartCounter();
    document.getElementById("counter").innerHTML = count;
}
function calculateTotal(){
    var price = 0;
    for(var i = 0; i < obj.itemList.length; i++){
        price += parseInt(obj.itemList[i].price);
    }
    document.getElementById("total").innerHTML = price;
}
function notify(){
    Notification.requestPermission(function(){
        // console.log("Notify User");
        var n = new Notification("Online Shopping : BMPL", {
            body : "Product added to cart",
            icon : "assets/images/success.png"
        });

        setTimeout(function(){
            n.close();
            // console.log("Notify User...");
        },1000);

    });
}
function saveChanges(){
    if(window.localStorage){
        var json = JSON.stringify(obj.itemList);
        // console.log(json);
        localStorage.setItem('cartProducts',json);
    }
    else {
        alert("Localstorage not supported...");
    }
}
function loadProducts(){
    if(localStorage.cartProducts){
        var data = JSON.parse(localStorage.cartProducts);
        obj.itemList = data;
        // printItems();
        // calculateTotal();
        cartCount();
    }
}
// --------------------------------------Search----------------------------------------
var toSearch = "";
var lu;
function search(){
    serproduct = "";
     lu = document.getElementById("serprd");
    lu.innerHTML = "";
    toSearch = event.srcElement.value;
    if(toSearch == ''){
        // serproduct = "";
        document.getElementById("disc").style.display = 'initial';
        document.getElementById("searchproducts").style.display = 'none';
    }
    else{
        document.getElementById("disc").style.display = 'none';
        document.getElementById("searchproducts").style.display = 'initial';
    }
    var se = document.getElementById("search12");
    var se1 = document.getElementById("search13");
    se.onkeyup = function(e){     
        var keycode = (e === null) ? window.event.keyCode : e.which;
        if(keycode === 13) {
            searchpage();
        } 
        else{
            document.getElementById("searchbtn").addEventListener("click",searchpage);
            document.getElementById("searchbtn1").addEventListener("click",searchpage);
        }
    }
    se1.onkeyup = function(e){     
        var keycode = (e === null) ? window.event.keyCode : e.which;
        if(keycode === 13) {
            searchpage();
        } 
        else{
            document.getElementById("searchbtn").addEventListener("click",searchpage);
            document.getElementById("searchbtn1").addEventListener("click",searchpage);
        }
    }
}
function searchpage()
{
    serproduct = "";
    if(toSearch == "smartphones" || toSearch == "smartphone" || toSearch == "phones" || toSearch == "mobile" || toSearch == "phone"){
        var n = 1;
        serproduct = products.filter(function(obj){
            var idcal = obj.p_id/100;
            console.log(idcal);
            cal = parseInt(idcal);
            if(n == cal){
            return obj.p_name;
            }
        });
    }
    else if(toSearch == "smartwatchs" || toSearch == "smartwearables" || toSearch == "watches" || toSearch == "watch" || toSearch == "smartdevice"){
        var n = 2;
        serproduct = products.filter(function(obj){
            var idcal = obj.p_id/100;
            console.log(idcal);
            cal = parseInt(idcal);
            if(n == cal){
            return obj.p_name;
            }
        });
    }
    else if(toSearch == "grooming" || toSearch == "health" || toSearch == "trimmer" || toSearch == "hairdryier" || toSearch == "hair"){
        var n = 3;
        serproduct = products.filter(function(obj){
            var idcal = obj.p_id/100;
            console.log(idcal);
            cal = parseInt(idcal);
            if(n == cal){
            return obj.p_name;
            }
        });
    }
    else if(toSearch == "footwear" || toSearch == "shoes" || toSearch == "shoe" || toSearch == "men" || toSearch == "bottomwear"){
        var n = 4;
        serproduct = products.filter(function(obj){
            var idcal = obj.p_id/100;
            console.log(idcal);
            cal = parseInt(idcal);
            if(n == cal){
            return obj.p_name;
            }
        });
    }
    else{
        serproduct = products.filter(function(obj){
            return obj.p_name.toLowerCase().includes(toSearch.toLowerCase());
        });
    }    
    showAllsearchedProducts();
}
function showAllsearchedProducts(){
    var norel = document.getElementById("noresult");
    norel.style.display = "none";
    if(serproduct.length == 0){
        norel.style.display = "initial";
    }
    var rupee=document.getElementById("rupee").innerHTML;
    var ul = document.getElementById("serprd");
    ul.innerHTML = "";
        for(var i = 0; i < serproduct.length; i++){
            var li = document.createElement("li");
            li.className = 'product';
            li.setAttribute('title', serproduct[i].p_id);
            // li.className = 'list-group-item product';
            var p_name = document.createElement("span");
            p_name.className = 'name';
            p_name.innerHTML = serproduct[i].p_name;
            var p_price = document.createElement("span");
            p_price.className = 'price';
            var p_curr = document.createElement("span");
            p_curr.className = 'currency';
            p_curr.innerHTML = rupee;
            p_price.innerHTML = serproduct[i].p_price;
            var p_image = document.createElement("img");
            p_image.className = 'productImage';
            p_image.setAttribute('src', serproduct[i].p_image);
            var p_quantity = document.createElement("span");
            p_quantity.innerHTML = serproduct[i].p_quantity;
            // console.log(p_quantity);
            p_quantity.className = 'pquan';
            var cart_button = document.createElement("button");
            cart_button.innerHTML = "Add to Cart";
            cart_button.className = 'cart-btn';
            li.appendChild(p_image);
            li.appendChild(p_name);
            li.appendChild(p_price);
            li.appendChild(p_curr);
            li.appendChild(cart_button);
            li.appendChild(p_quantity);
            ul.appendChild(li);
            cart_button.addEventListener("click", add);
    }
}

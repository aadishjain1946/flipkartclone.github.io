window.addEventListener("load",initevents);
function initevents(){
    loadProducts();
}
function loadProducts(){
    if(localStorage.cartProducts){
        var data = JSON.parse(localStorage.cartProducts);
        obj.itemList = data;
        printItems();
        calculateTotal();
        cartCount();
    }
}
function cartCount(){
    count = obj.cartCounter();
    document.getElementById("counter1").innerHTML = count;
}
function saveChanges(){
    if(window.localStorage){
        var json = JSON.stringify(obj.itemList);
        console.log(json);
        localStorage.setItem('cartProducts',json);
    }
    else {
        alert("Localstorage not supported...");
    }
}
function printItems() {
    var rupee=document.getElementById("rupee").innerHTML;
    var ul = document.getElementById("cartproduct");
    ul.innerHTML = "";
    obj.itemList.forEach(function(elem){
        var li = document.createElement("li");
        li.className = 'product';
        li.setAttribute('title', elem.id);
        // li.className = 'list-group-item product';
        var p_name = document.createElement("span");
        p_name.innerHTML = elem.name;
        p_name.className = 'name';
        var p_curr = document.createElement("span");
        p_curr.innerHTML = rupee;
        p_curr.className = 'curr';
        var p_price = document.createElement("span");
        p_price.innerHTML = elem.price;
        p_price.className = 'pprice';
        var p_image = document.createElement("img");
        p_image.className = 'productImage';
        p_image.setAttribute('src', elem.image);
        var delete_button = document.createElement("button");
        delete_button.innerHTML = "<i class='fas  fa-trash'/>";
        delete_button.className = 'delbtn';
        li.appendChild(p_image);
        li.appendChild(p_name);
        li.appendChild(p_price);
        li.appendChild(p_curr);
        li.appendChild(delete_button);
        ul.appendChild(li);
        delete_button.addEventListener("click", deleteProduct);
    })
}
function deleteProduct(){
    var elem = event.srcElement;
    elem = elem.parentElement;
    console.log("Deleting", elem);
    var id = elem.title;
    obj.deleteItem(id);
    printItems();
    saveChanges();
    calculateTotal()
    cartCount();
}
function calculateTotal(){
    var price = 0;
    for(var i = 0; i < obj.itemList.length; i++){
        price += parseInt(obj.itemList[i].price);
    }
    document.getElementById("total").innerHTML = price;
}
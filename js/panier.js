// Déclarations
class Cart {
    constructor() {
        this.items = [];
        if (localStorage.getItem("cart")) {
        this.items = JSON.parse(localStorage.getItem("cart"));
        }
    }
    
    save() {
        localStorage.setItem("cart", JSON.stringify(this.items));
    }
    
    add(product, lenses, quantity) {
        let item = this.items.find(item => item.product == product && item.lenses == lenses);
        
        if (typeof item == "undefined") {
        this.items.push(new CartItem(product, lenses, quantity));
        } else {
        item.quantity += quantity;
        } 
        this.save();
    }
    
    delete(product, lenses) {
        this.items = this.items.filter(item => item.product != product && item.lenses != lenses);
        this.save();
    }
    
    clear() {
        this.items = [];
        this.save();
    }
}
    
    class CartItem {
        constructor(product, lenses, quantity) {
            this.product = product;
            this.lenses = lenses;
            this.quantity = quantity;
        }
    
    increaseQuantity() {
        this.quantity++;
    }
    
    decreaseQuantity() {
        this.quantity--;
    }
}

function promiseGet(idProduct) {
    return new Promise((resolve, reject) => {
        let ajax = new XMLHttpRequest();
        ajax.open('GET', 'http://localhost:3000/api/cameras/' + idProduct);

        ajax.send();
        ajax.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    resolve(JSON.parse(this.responseText));
                }
                else {
                    reject(XMLHttpRequest);
                }
            }
        }
    })
};

let cart = new Cart;

// affichage des éléments du panier
if(localStorage.length != 0){
    cart.items.forEach(element => {
    promiseGet(element.product)
        .then(function (response){
        let localQuantity = element.quantity;
        let cartName = document.getElementById("cartName");
        let cartLens = document.getElementById("cartLens");
        let cartQuantity = document.getElementById("cartQuantity");
        let cartPrice = document.getElementById("cartPrice");
        let plusButton = document.getElementById("plusButton");
        let minusButton= document.getElementById("minusButton");
        let clearCart = document.getElementById("clearCart");

        cartName.innerHTML = "Produit : " + response["name"];
        cartLens.innerHTML = "Lentille sélectionnée : " + element.lenses;
        cartQuantity.innerHTML = "Quantité : " + localQuantity;
        cartPrice.innerHTML = "Prix : " + response["price"] * localQuantity / 100 + " euros";
        minusButton.addEventListener("click", function(event){
            element.decreaseQuantity();
        });
        plusButton.addEventListener("click", function(event){
            element.increaseQuantity();
        });
        clearCart.addEventListener("click", function(event){
            element.clear();
        });
    });
    let cartTotalPrice = document.getElementById("cartTotalPrice");
    });
} else{
    let cartIf = document.getElementById("panier");
    let cartEmpty = document.createElement("h2");
    let clearCart = document.getElementById("clearCart");
    cartEmpty.classList.add("text-center");
    cartIf.appendChild(cartEmpty).innerHTML = "Votre panier est vide.";
    plusButton.style.display = "none";
    minusButton.style.display = "none";
    plusButton.style.display = "none";
    clearCart.style.display = "none";
};

// Gestion du formulaire
let cartSubmit = document.getElementById("cartSubmit");
cartSubmit.addEventListener("click", function(event){
    let cartName = document.getElementById("cartName");
    let cartFirstName = document.getElementById("cartFirstName");
    let cartEmail = document.getElementById("cartEmail");
    let cartAdress = document.getElementById("cartAdress");
    let cartCity = document.getElementById("cartCity");

    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/api/cameras/order");
    request.setRequestHeader("Content-Type", "application/json");
    let contact = {
        firstName: cartFirstName.value,
        lastName: cartName.value,
        address: cartAddress.value,
        city: cartCity.value,
        email: cartEmail.value,
    };

    let products = [];
    for (i = 0; i < localStorage.length; i++){
        products.push((element.product));
    }
    
    let objet = {
        contact,
        products,
    }
    let order = JSON.stringify(objet)

    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            console.log(this.responseText)
            window.location = "confirmation.html";
            localStorage.setItem("order", this.responseText)
        }
    }
    request.send(order);
});
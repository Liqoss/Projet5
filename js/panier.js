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
    let cartTable = document.getElementById("cart");
    let cartTr = document.createElement("tr");
    let cartName = document.createElement("td");
    let cartLens = document.createElement("td");
    let cartQuantity = document.createElement("td");
    let adjustQuantity = document.createElement("td");
    let cartPrice = document.createElement("td");

    cartName.classList.add("underline");
    cartLens.classList.add("underline");
    cartQuantity.classList.add("underline");
    cartPrice.classList.add("underline");

    cartTable.appendChild(cartTr).appendChild(cartName).innerHTML = "Nom du produit";
    cartTable.appendChild(cartTr).appendChild(cartLens).innerHTML = "Lentille associée";
    cartTable.appendChild(cartTr).appendChild(cartQuantity).innerHTML = "Quantité";
    cartTable.appendChild(cartTr).appendChild(adjustQuantity);
    cartTable.appendChild(cartTr).appendChild(cartPrice).innerHTML = "Prix";
    
    cart.items.forEach(element => {
        promiseGet(element.product)
            .then(function (response){
            let cartTable = document.getElementById("cart");
            let clearCart = document.getElementById("clearCart")
            let totalPrice = document.getElementById("totalPrice");
            let cartTr = document.createElement("tr");
            let cartName = document.createElement("td");
            let cartLens = document.createElement("td");
            let cartQuantity = document.createElement("td");
            let cartPrice = document.createElement("td");
            let cartButton = document.createElement("td");
            let plusButton = document.createElement("a");
            let minusButton= document.createElement("a");
            
            cartTr.classList.add("fontSize");
            cartButton.classList.add("positionButton")
            plusButton.classList.add("lineHeight", "text-decoration-none");
            minusButton.classList.add("lineHeight", "text-decoration-none");

            cartTable.appendChild(cartTr).appendChild(cartName).innerHTML = response["name"];
            cartTable.appendChild(cartTr).appendChild(cartLens).innerHTML = element.lenses;
            cartTable.appendChild(cartTr).appendChild(cartQuantity).innerHTML = element.quantity;
            
            cartTable.appendChild(cartTr).appendChild(cartButton).appendChild(minusButton).innerHTML = "-";
            minusButton.addEventListener("click", function(event){
                element.quantity--;
                cartQuantity.innerHTML = element.quantity;
                cartPrice.innerHTML = response["price"] * element.quantity / 100 + " euros";
            });
            
            cartTable.appendChild(cartTr).appendChild(cartButton).appendChild(plusButton).innerHTML = "+";
            plusButton.addEventListener("click", function(event){
                element.quantity++;
                cartQuantity.innerHTML = element.quantity;
                cartPrice.innerHTML = response["price"] * element.quantity / 100 + " euros";
            });
            cartTable.appendChild(cartTr).appendChild(cartPrice).innerHTML = response["price"] * element.quantity / 100 + " euros";
            
            clearCart.addEventListener("click", function(event){
                if (confirm("Voulez-vous vraiment effacer l'intégralité du panier ?")) {
                    localStorage.clear();
                    window.location = "panier.html"
                  } else {
                  }
            })
        });
    });
} else{
    let cartIf = document.getElementById("cart");
    let cartEmpty = document.createElement("td");
    cartEmpty.classList.add("text-center");
    cartIf.appendChild(cartEmpty).innerHTML = "Votre panier est vide.";
    clearCart.classList.add("invisible");
    totalPrice.classList.add("invisible");
};

// Gestion du formulaire
let cartSubmit = document.getElementById("cartSubmit");
cartSubmit.addEventListener("click", function(event){
    let cartLastName = document.getElementById("cartLastName");
    let cartFirstName = document.getElementById("cartFirstName");
    let cartEmail = document.getElementById("cartEmail");
    let cartAddress = document.getElementById("cartAdress");
    let cartCity = document.getElementById("cartCity");

    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/api/cameras/order");
    request.setRequestHeader("Content-Type", "application/json");
    let contact = {
        firstName: cartFirstName.value,
        lastName: cartLastName.value,
        address: cartAddress.value,
        city: cartCity.value,
        email: cartEmail.value,
    };

    cart.items.forEach(element => {
    promiseGet(element.product)
    .then(function (response){
    let products = [];
    for (i = 0; i < cart.items.length; i++){
        products.push((element.product));
    }
    
    let object = {
        contact,
        products,
    }
    let order = JSON.stringify(object)

    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            localStorage.setItem("order", this.responseText)
            window.location = "confirmation.html";
        }
    }
    request.send(order);
    });
    })
});

function calculateSum() {
    var sum = 0;
    //iterate through each textboxes and add the values
    $(".txt").each(function () {
        //add only if the value is number
        if (!isNaN(this.value) && this.value.length != 0) {
            sum += parseFloat(this.value);
        }
    });
}
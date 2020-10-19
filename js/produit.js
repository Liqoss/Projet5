// Récupération de l'id de la caméra
let idSearch = window.location.search;
let idCamera = idSearch.substr(4);

// Affichage de l'image de la caméra
function promiseGet() {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('GET', 'http://localhost:3000/api/cameras/' + idCamera);

        request.send();
        request.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    resolve(JSON.parse(this.responseText));
                    let response = JSON.parse(this.responseText);

                }
                else {
                    reject(XMLHttpRequest);
                }
            }
        }
    })
};

promiseGet()
    .then(function (response) {
        let imageCamera = document.getElementById("imageCamera");
        let nameCamera = document.getElementById("nameCamera");
        let priceCamera = document.getElementById("priceCamera");
        let description = document.getElementById("description");
        imageCamera.src = response["imageUrl"];
        nameCamera.innerHTML = response["name"];
        priceCamera.innerHTML+= response["price"] / 100 + " euros";
        description.innerHTML+= response["description"];
    });

// Choix du nombre de caméra
for (a = 1; a < 5; a++) {
    let selectQuantity = document.getElementById("quantityCamera")
    let option = document.createElement("option");
    option.text = [a];
    option.setAttribute("value", option.text);
    selectQuantity.add(option);
    selectQuantity.addEventListener("click", function (event){
        let quantityStorage = selectQuantity.value;
        sessionStorage.setItem("quantity", JSON.stringify(quantityStorage));
        console.log(quantityStorage);
    })
};

// Choix de la lentille
promiseGet()
.then(function (response) {
    for (d = -1; d < response["lenses"].length; d++) {
        if (d < 0) {
            let selectLens = document.getElementById("lensCamera")
            let option = document.createElement("option");
            option.text = "choisir";
            selectLens.add(option);
        }
        else {
            let selectLens = document.getElementById("lensCamera")
            let option = document.createElement("option");
            option.text = response["lenses"][d];
            option.setAttribute("value", option.text);
            selectLens.add(option);
            selectLens.addEventListener("click", function (event) {
                if (selectLens.value != "choisir") {
                    let lensStorage = selectLens.value;
                    sessionStorage.setItem("lenses", JSON.stringify(lensStorage));
                    console.log(lensStorage);
                }
            })
        };
    };
});

// Ajout au panier 
class Cart {
    constructor() {
        this.items = [];
        if (localStorage.getItem("cart")) {
        this.items = JSON.parse(localStorage.getItem("cart")).map(item => new CartItem(item.product, item.lenses, item.quantity));
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

let buttonCart = document.getElementById("buttonCart");
buttonCart.addEventListener("click", function (event){
    let addLens = JSON.parse(sessionStorage.getItem("lenses"));
    let addQuantity = JSON.parse(sessionStorage.getItem("quantity"));
    new Cart().add(idCamera, addLens, addQuantity);
    window.location = "panier.html";
    console.log(localStorage);
});
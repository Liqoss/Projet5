// Récupération de l'id de la caméra
function getId() {
let idSearch = window.location.search;
let idCamera = idSearch.substr(4);
return idCamera
};

// Affichage de l'image de la caméra
function promiseGet() {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('GET', 'http://localhost:3000/api/cameras/' + getId());

        request.send();
        request.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    console.log(this.status)
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
    .then(function showCamera(camera) {
        let imageCamera = document.getElementById("imageCamera");
        let nameCamera = document.getElementById("nameCamera");
        let priceCamera = document.getElementById("priceCamera");
        let description = document.getElementById("description");
        imageCamera.src = camera["imageUrl"];
        imageCamera.classList.add("w-25", "mb-3", "rounded-lg");
        nameCamera.innerHTML = camera["name"];
        priceCamera.innerHTML+= camera["price"] / 100 + " euros";
        description.innerHTML+= camera["description"];
    });

// Choix du nombre de caméra
function chooseNumber() {
    for (a = 1; a < 6; a++) {
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
}
chooseNumber();

// Choix de la lentille
function chooseLens(){
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
}
chooseLens();


// Ajout au panier
function addToCart(){
let buttonCart = document.getElementById("buttonCart");
buttonCart.addEventListener("click", function (event){
    let addLens = JSON.parse(sessionStorage.getItem("lenses"));
    let addQuantity = JSON.parse(sessionStorage.getItem("quantity"));
    new Cart().add(getId(), addLens, addQuantity);
    window.location = "panier.html";
});
}
addToCart();
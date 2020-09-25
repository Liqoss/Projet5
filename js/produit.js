// Récupération de l'id de la caméra sélectionnée
var UrlParams = window.location.search;
var idCamera = UrlParams.substr(4);

let newCamera = document.getElementById("cameraChosen")
newCamera.classList.add("card-body");
let cameraH3 = document.createElement("h3");
let labelLens = document.createElement("label");
let choiceLens = document.createElement("select");
cameraH3.classList.add("card-title");
let divImg = document.createElement("div");
divImg.classList.add("text-center", "col-lg-6");
let divDescription = document.createElement("div");
divDescription.classList.add("col-lg-6");
let cameraPrice = document.createElement("h4");
let cameraDescription = document.createElement("p");
let divLens = document.createElement("div");
divLens.classList.add("col-lg-4");
let addCamera = document.createElement("input");
let myImg = new Image();
myImg.addEventListener('load', function () { })
addCamera.classList.add("btn", "btn-primary");
let addCart = document.createElement("a");

// Affichage de la caméra en fonction de son id
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
        myImg.src = response["imageUrl"];
        newCamera.appendChild(divImg).appendChild(myImg);
        newCamera.appendChild(cameraH3).innerHTML = response["name"];
        newCamera.appendChild(cameraPrice).innerHTML = "Prix : " + response["price"] / 100 + " euros";
        newCamera.appendChild(cameraDescription).innerHTML = "Description :" + response["description"];
        labelLens.innerHTML = "Lentille souhaitée :";

    })

// Choix du nombre de produit
promiseGet()
    .then(function () {

        let labelNumberOfCamera = document.createElement("label");
        labelNumberOfCamera.classList.add("col-lg");
        labelNumberOfCamera.innerHTML = "Quantité : ";
        let number = document.createElement("select");
        var xNumber = newCamera.appendChild(labelNumberOfCamera).appendChild(number);
        var optionNumber = document.createElement("option");

        for (d = 1; d <= 5; d++) {
            var optionNumber = document.createElement("option");
            optionNumber.text = d
            xNumber.add(optionNumber);
            sessionStorage.setItem("amount", "1")
            number.addEventListener("click", function (event) {
                sessionStorage.removeItem("amount")
                let numberStorage = xNumber.value
                sessionStorage.setItem("amount", numberStorage);
                console.log(numberStorage)
            });

        }
    })

    // choix de la lentille
    promiseGet()
    .then(function (response) {
        for (d = -1; d < response["lenses"].length; d++) {
            if (d < 0) {
                let x = newCamera.appendChild(labelLens).appendChild(choiceLens)
                let option = document.createElement("option");
                option.text = "choisir";
                x.add(option);
            }
            else {
                let x = newCamera.appendChild(labelLens).appendChild(choiceLens)
                let option = document.createElement("option");
                option.text = response["lenses"][d];
                option.setAttribute("value", option.text);
                x.add(option);

                choiceLens.addEventListener("click", function (event) {
                    sessionStorage.removeItem("lenses")
                    if (x.value != "choisir") {
                    
                        let lensStorage = x.value;
                        sessionStorage.setItem("lenses", lensStorage);
                        console.log(lensStorage)
                    }
                })
            }
        }
    })

    // Ajout du produit au panier
    promiseGet()
    .then(function (response) {
        addCamera.type = "submit";
        newCamera.appendChild(divLens).appendChild(addCamera).innerHTML = "Ajouter au panier";
        addCamera.addEventListener("click", function (event) {
        if (sessionStorage.getItem("lenses")){
            let test = (JSON.stringify({
                id: response["_id"],
                name: response["name"],
                price: response["price"] / 100,
                amount: sessionStorage.getItem("amount"),
                lenses: sessionStorage.getItem("lenses"),
                imageUrl: response["imageUrl"]
            }));
                sessionStorage.setItem("newArticle", test);
                sessionStorage.removeItem("lenses");
                sessionStorage.removeItem("amount");
                window.location = "panier.html";
            }
            else {
                alert("Veuillez préciser la lentille que vous souhaitez associer à l'appareil !")
            }
        })
    })

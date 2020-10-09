let idProduct = JSON.parse(localStorage.getItem("cart"));

function promiseGet() {
    return new Promise((resolve, reject) => {
        let ajax = new XMLHttpRequest();
        ajax.open('GET', 'http://localhost:3000/api/cameras/' + idProduct["product"]);

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


for (d = 0; d < localStorage.length; d++){
    promiseGet()
    .then(function (response){
    let cartLine = document.getElementById("panier");
    let cartName = document.createElement("h2");
    let cartLens = document.createElement("h2");
    let cartQuantity = document.createElement("h2");
    let cartPrice = document.createElement("h2");

    cartLine.appendChild(cartName).innerHTML = response["name"];
    cartLine.appendChild(cartLens).innerHTML = JSON.parse(localStorage.getItem("lenses"));
    cartLine.appendChild(cartQuantity).innerHTML = JSON.parse(localStorage.getItem("quantity"));
    cartLine.appendChild(cartPrice).innerHTML = response["price"] * localStorage.getItem("quantity");
    });
}

/*for (d = 0; d < localStorage.length; d++){
    récupérer l'id[d]
    promiseGet
    afficher les infos
}*/
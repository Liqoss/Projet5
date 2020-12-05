// promesse pour récupérer les éléments dynamiquement
function promiseGet() {

    return new Promise((resolve, reject) => {
        let recoverHttp = new XMLHttpRequest();
        recoverHttp.open('GET', 'http://localhost:3000/api/cameras/');
        recoverHttp.send();
        recoverHttp.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    resolve(JSON.parse(this.responseText));
                } else {
                    reject(XMLHttpRequest);
                }
            }
        }
    })
};

promiseGet()
    .then(function showCameras(cameras) {
        for (let i = 0; i < cameras.length; i++) {
            let elt = document.getElementById("image");
            let myImg = new Image();
            myImg.addEventListener('load', function () {});
            myImg.src = cameras[i]["imageUrl"];
            myImg.classList.add("w-100", "img");
            const divRow = document.createElement("div");
            divRow.classList.add("row", "my-lg-4", "y-center", "w-100");
            const divImage = document.createElement("div");
            divImage.classList.add("col-lg-3")
            const newDiv = document.createElement("div");
            newDiv.classList.add("col-lg-6", "my-3", "offset-1", "text-center");
            const nameCamera = document.createElement("h2");
            const priceCamera = document.createElement("p");
            const descriptionCamera = document.createElement("p");
            descriptionCamera.classList.add("mb-4")
            const lienProduct = document.createElement("a");
            let idLien = cameras[i]["_id"];
            lienProduct.href = "produit.html?id=" + idLien;
            elt.appendChild(divRow).appendChild(divImage).appendChild(myImg);
            elt.appendChild(divRow).appendChild(newDiv).appendChild(lienProduct).appendChild(nameCamera).innerHTML = cameras[i]["name"];
            elt.appendChild(divRow).appendChild(newDiv).appendChild(priceCamera).innerHTML = "Prix : " + cameras[i]["price"] / 100 + " €";
            elt.appendChild(divRow).appendChild(newDiv).appendChild(descriptionCamera).innerHTML = "Description : " + cameras[i]["description"];
            myImg.addEventListener("click", function(event){
                window.location = "produit.html?id=" +idLien;
            })
        } 
    });
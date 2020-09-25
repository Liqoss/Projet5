if (sessionStorage.getItem("newArticle")) {
    let session = sessionStorage.getItem("newArticle");
    localStorage.setItem("Ori" + localStorage.length++, session);
    sessionStorage.removeItem("newArticle")
}

// afichage dynamique des caméras commandées
if (localStorage.length >= 1) {
    for (i = 0; i < localStorage.length; i++) {
        let newArticle = JSON.parse(localStorage.getItem("Ori" + i));
        let elt = document.getElementById("panier");
        let pName = document.createElement("p");
        let imgCamera = new Image();
        let divNewArticle = document.createElement("div");
        divNewArticle.classList.add("row");
        imgCamera.src = newArticle["imageUrl"];
        imgCamera.addEventListener("load", function () { });
        let divIMG = document.createElement("div");
        divIMG.classList.add("col-lg-3");                   
        let divName = document.createElement("div");
        divName.classList.add("col-lg-2", "text-center", "my-5");
        let divLens = document.createElement("div");
        divLens.classList.add("col-lg-2", "text-center", "my-5");
        let divAmount = document.createElement("div");
        divAmount.classList.add("col-lg-2", "text-center", "my-5");
        let divPrice = document.createElement("div");
        divPrice.classList.add("col-lg-2", "text-center", "my-5");
        let divRemoveArticle = document.createElement("div");
        divRemoveArticle.classList.add("my-5");

        elt.appendChild(divNewArticle).appendChild(divIMG).appendChild(imgCamera);
        elt.appendChild(divNewArticle).appendChild(divName).appendChild(pName).innerHTML = "Nom de l'article : " + newArticle["name"];
        elt.appendChild(divNewArticle).appendChild(divLens).innerHTML = 'Lentille associée : ' + newArticle["lenses"];
        elt.appendChild(divNewArticle).appendChild(divAmount).innerHTML = "Quantité : " + newArticle["amount"];
        elt.appendChild(divNewArticle).appendChild(divPrice).innerHTML = "Prix à l'unité : " + newArticle["price"] + " euros";
    }
}
else {
    let elt = document.getElementById("panier");
    let emptyCart = document.createElement("p")
    emptyCart.classList.add("text-center", "font-italic")
    elt.appendChild(emptyCart).innerHTML = "Votre panier est vide";
}
// fin de l'affichage dynamique des caméras commandées

// ajout d'un bouton pour vider le panier
let divRemoveArticle = document.createElement("div");
divRemoveArticle.classList.add("row", "text-center");
let removeArticle = document.createElement("p");
let removeArticleA = document.createElement("a");
removeArticleA.classList.add("stretched-link")
removeArticleA.href = "panier.html";
removeArticle.classList.add("col-lg-2", "offset-lg-5","my-5");
removeArticle.addEventListener("click", function (e) {
    localStorage.clear()
});
let elt = document.getElementById("panier");
elt.appendChild(divRemoveArticle).appendChild(removeArticle).appendChild(removeArticleA).innerHTML = "Vider le panier";
// fin de l'ajout du bouton panier 

// ajout d'une fonctionnalité "total"
let divTotalPrice = document.createElement("div");
divTotalPrice.classList.add("text-center", "text-primary");
let totalPrice = []
for (i = 0; i < localStorage.length; i++) {
    let article = JSON.parse(localStorage.getItem(localStorage.key(i)))
    let calcul = article["price"] * article["amount"];
    totalPrice.push(calcul)
};
const reducer = (accumulator, currentValue) => accumulator + currentValue;

elt.appendChild(divTotalPrice).innerHTML = "Total de votre commande : " + totalPrice.reduce(reducer) + " euros"
// fin de l'ajout de la fonctionnalité "total"

// gestion du formulaire

/* Si une ligne est déjà présente :
        Additionner ces deux lignes
    Sinon :
        Ajouter une ligne (procédure par défaut)
    if (v.id == id) {
            newArticle = false;
            v.qt += qt;
            $('#'+ id).html('<a href="'+ url +'">'+ name +'<br><small>Quantité : <span class="qt">'+ v.qt +'</span></small></a>');
        }
        
    */
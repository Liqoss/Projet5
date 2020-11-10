let order = JSON.parse(localStorage.getItem("order"));
let thanks = document.getElementById("thanks");
let p = document.createElement("p");


thanks.appendChild(p).innerHTML = " Oritechno vous remercie pour votre achat. Votre commande portera le n°" + order["orderId"] + ". Vous recevrez par mail la confirmation de votre commmande."
localStorage.clear()
sessionStorage.clear()
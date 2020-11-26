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
        item.quantity = parseInt(item.quantity) + parseInt(quantity);
        } 
        this.save();
    }
}

class CartItem {
    constructor(product, lenses, quantity) {
        this.product = product;
        this.lenses = lenses;
        this.quantity = quantity;
    }
};
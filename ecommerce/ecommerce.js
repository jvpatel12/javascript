document.addEventListener('DOMContentLoaded',()=>{
    const products = [{id:1,name:"product 1",price:29.99},{id:2,name:"product 2",price:39.99}]; 


    const cart = [];

    const productList  = document.getElementById('product-List');
    const cartItems = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart');
    const cartTotalMessage = document.getElementById('cart-total');
    const totalPriceDisplay = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout-btn');
    const removeButton = document.getElementById('remove-btn');
      
    products.forEach((product)=>{
     
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML=`
        <span>${product.name} - ${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to cart</button>
        `;
        productList.appendChild(productDiv);
    }
);


productList.addEventListener('click',(e)=>{
    e.preventDefault();
    if(e.target.tagName==='BUTTON'){
        const productId = parseInt( e.target.getAttribute('data-id'));
        const product = products.find(p=>p.id===productId);
        addTocart(product);
    }})

    function addTocart(product){
        cart.push(product);
       renderCart();
     
    }


    function renderCart(){
        
        cartItems.innerHTML = "";

        let totalPrice  = 0;

        if(cart.length === 0){
            checkoutButton.disabled = true;
            cartTotalMessage.classList.add("hidden");
            totalPriceDisplay.textContent = "0.00";
        }

        if(cart.length >  0){
             emptyCartMessage.classList.add("hidden");
             cartTotalMessage.classList.remove("hidden");

            cart.forEach((item,index)=>{
                const li = document.createElement('li');
                li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
                cartItems.appendChild(li);
                totalPrice += item.price;
            });
            totalPriceDisplay.textContent = totalPrice.toFixed(2);
            checkoutButton.disabled = false;


        }else{
            emptyCartMessage.classList.remove("hidden");
        }
    }

    checkoutButton.addEventListener('click',()=>{
        alert('Checkout - Total Price: $' + totalPriceDisplay.textContent);
        cart.length = 0;
        renderCart();
    }
);

  removeButton.addEventListener('click',()=>{
    cart.pop();
    
    renderCart();
  })
});

 

// //(method) Number.toFixed(fractionDigits?: number | undefined): string
// Returns a string representing a number in fixed-point notation.

// @param fractionDigits — Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.
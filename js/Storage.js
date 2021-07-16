//add new key=>value to the HTML5 storage
function SaveItem(id, value) {
	//var value = name + '%$^&' + pic + '%$^&' + qty + '%$^&' + price + '%$^&' + disPrice;
	//name, pic, qty, price, disPrice
	localStorage.setItem(id, value + '%$^&' + 1);
	doShowAll();
}
//------------------------------------------------------------------------------
//change an existing key=>value in the HTML5 storage
function ModifyItem(id, inc) {
//check if key exists
	if (localStorage.getItem(id) !=null)
	{
		var value = localStorage.getItem(id);
		var values = value.split("%$^&");
			  //update
		var totalQty = values[4];
		var qty = values[5];
		if (inc) qty = parseInt(qty) + 1;
		else qty = parseInt(qty) - 1;
		if (qty > totalQty) return false;
		if (qty <= 0) return false;
		value = values[0] + '%$^&' + values[1] + '%$^&' + values[2] + '%$^&' + values[3] + '%$^&' + values[4] + '%$^&' + qty;
		localStorage.setItem(id, value);
		//var idInt = id.split('-')[1];
		$('q-' + id).text(qty);
		doShowAll();
		return true;
			  //document.forms.ShoppingList.data.value = localStorage.getItem(name1);
			}
		
	
	
}
//-------------------------------------------------------------------------
//delete an existing key=>value from the HTML5 storage
function RemoveItem(id) {
	//var name = document.forms.ShoppingList.name.value;
	//document.forms.ShoppingList.data.value = localStorage.removeItem(id);
	id = id.trim();
	localStorage.removeItem(id);
	doShowAll();
}
//-------------------------------------------------------------------------------------
//restart the local storage
function ClearAll() {
	localStorage.clear();
	doShowAll();
}
//--------------------------------------------------------------------------------------
// dynamically populate the table with shopping list items
//below step can be done via PHP and AJAX too. 
function doShowAll() {
	if (CheckBrowser()) {
		var key = "";
		var list = ''; //"<tr><th>Item</th><th>Value</th></tr>\n";
		var i = 0;
		//for more advance feature, you can set cap on max items in the cart
		for (i = 0; i <= localStorage.length-1; i++) {
			key = localStorage.key(i);
			var values = localStorage.getItem(key).split("%$^&");
			var name = values[0];
			var price = values[1];
			var dicPrice = values[2];
			var pic = values[3];
			var totalQty = values[4];
			var qty = values[5];
			var total = parseFloat(price) * parseInt(qty);

			//p-2 mt-4 
			list += '<div class="cart-list-row d-flex flex-row justify-content-between align-items-center bg-white  px-3 rounded">' +
				'<div class="mr-1" ><img class="rounded" src="images/' + pic + '" width="70"></div>' +
                            '<div class="d-flex flex-column align-items-center product-details">'+
				'<span class="font-weight-bold d-none d-sm-block">' + name + '</span>'+
                                //<div class="d-flex flex-row product-desc">
                                //    <div class="size mr-1"><span class="text-grey">Size:</span><span class="font-weight-bold">&nbsp;M</span></div>
                                //    <div class="color"><span class="text-grey">Color:</span><span class="font-weight-bold">&nbsp;Grey</span></div>
                                //</div>
                            '</div>' +
				'<div class="d-flex flex-row align-items-center"><h6 class="text-grey">৳' + price + '</h6></div><div class="d-flex flex-row align-items-center qty">' +
				'  <i class="fa fa-minus text-danger" onClick="ModifyItem(\'' + key.trim() + '\',' + false + ')"></i>' +
				//' (<h6 class="text-grey">' + price + '</h6> <i class="fas fa-times"></i> <h6 class="text-grey mt-1 mr-1 ml-1" id="q-' + key + '">' + qty + '</h6>) &nbsp; = &nbsp;<h5 class="text-grey">' + total + '</h5><i class="fa fa-plus text-success" onClick="ModifyItem(\'' + key.trim() + '\',' + true + ')"></i>' +
				'   <h6 class="text-grey mt-1 mr-1 ml-1" id="q-' + key + '">' + qty + '</h6><i class="fa fa-plus text-success" onClick="ModifyItem(\'' + key.trim() + '\',' + true + ')"></i>' +
				'</div><div class="d-flex flex-row align-items-center"><h6 class="text-grey">৳' + total + '</h6></div>' +
			//' <div><h5 class="text-grey">' + price + '</h5></div>' +
				'<div class="product-line-price" style="display:none;"><h5 class="text-grey">' + total + '</h5></div><div class="d-flex align-items-center"><i class="fa fa-trash mb-1 text-danger" onClick="RemoveItem(\'' + key.trim() + '\')"></i></div>' +
				//'' +
				'</div>';
			
		}
		//if no item exists in the cart
		if (localStorage.length == 0) {
			list = "<h6 style='color:red'>There is no item</h6>";
		}
		//bind the data to html table
		//you can use jQuery too....
		document.getElementById('cartList').innerHTML = list;
		recalculateCartTotal();
	} else {
		alert('Cannot save shopping list as your browser does not support HTML 5');
	}
}

/*
 =====> Checking the browser support
 //this step may not be required as most of modern browsers do support HTML5
 */
 //below function may be redundant
function CheckBrowser() {
	if ('localStorage' in window && window['localStorage'] !== null) {
		// we can use localStorage object to store data
		return true;
	} else {
			return false;
	}
}
//-------------------------------------------------
/*
You can extend this script by inserting data to database or adding payment processing API to shopping cart..
*/


//for cart
/* Set rates + misc */


///* Assign actions */
//$('.product-quantity input').change(function () {
//	updateQuantity(this);
//});

//$('.product-removal button').click(function () {
//	removeItem(this);
//});


/* Recalculate cart */
function recalculateCartTotal() {
	var taxRate = 0.00;
	var shippingRate = 15.00;
	var fadeTime = 300;
	var data = [];
	/* Sum up row totals */
	$('#cartList .cart-list-row').each(function () {
		var t = $(this).children('.product-line-price').text().trim();
		data.push(t);
		//var tFloat = parseFloat(t);
		//console.log(tFloat);
		//subtotal = parseFloat(subtotal) + tFloat;
	});
	data = data.filter((c) => !isNaN(parseInt(c)));
	var subtotal = eval(data.join("+"));
	//console.log(taxRate);
	/* Calculate totals */
	var tax = subtotal * taxRate;
	var shipping = (subtotal > 0 ? shippingRate : 0);
	var total = subtotal + tax + shipping;
	if (total>0)
	/* Update totals display */
	$('.totals-value').fadeOut(fadeTime, function () {
		$('#cart-subtotal').html(subtotal.toFixed(2));
		$('#cart-tax').html(tax.toFixed(2));
		$('#cart-shipping').html(shipping.toFixed(2));
		$('#cart-total').html(total.toFixed(2));
		if (total == 0) {
			$('.checkout').fadeOut(fadeTime);
		} else {
			$('.checkout').fadeIn(fadeTime);
		}
		$('.totals-value').fadeIn(fadeTime);
	});
}


///* Update quantity */
//function updateQuantity(quantityInput) {
//	/* Calculate line price */
//	var productRow = $(quantityInput).parent().parent();
//	var price = parseFloat(productRow.children('.product-price').text());
//	var quantity = $(quantityInput).val();
//	var linePrice = price * quantity;

//	/* Update line price display and recalc cart totals */
//	productRow.children('.product-line-price').each(function () {
//		$(this).fadeOut(fadeTime, function () {
//			$(this).text(linePrice.toFixed(2));
//			recalculateCart();
//			$(this).fadeIn(fadeTime);
//		});
//	});
//}


///* Remove item from cart */
//function removeItem(removeButton) {
//	/* Remove row from DOM and recalc cart total */
//	var productRow = $(removeButton).parent().parent();
//	productRow.slideUp(fadeTime, function () {
//		productRow.remove();
//		recalculateCart();
//	});
//}
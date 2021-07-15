let count = 0;
//if add to cart btn clicked
$('.cart-btn').on('click', function () {
    let cart = $('.cart-nav');
    // find the img of that card which button is clicked by user
    let imgtodrag = $(this).parent('.add2cart').parent('.product-card').find("img").eq(0);
    let checkBox = $(this).parent('.add2cart').prev('.added2cart').find(".checkbox").eq(0);
    let inputValue = $(this).parent('.add2cart').parent('.product-card').find("input").eq(0);
    SaveItem(inputValue.attr('id'), inputValue.val());
    if (imgtodrag) {
        checkBoxCkecked(checkBox);
        //checkBox.show();
        //checkBox.prop("checked", true);
        //checkBox.parent('.added2cart').css('opacity', '1');
        //checkBox.parent('.added2cart').next('.add2cart').css('display', 'none');
        // duplicate the img
        var imgclone = imgtodrag.clone().offset({
            top: imgtodrag.offset().top,
            left: imgtodrag.offset().left
        }).css({
            'opacity': '0.8',
            'position': 'absolute',
            'height': '150px',
            'width': '150px',
            'z-index': '100'
        }).appendTo($('body')).animate({
            'top': cart.offset().top + 20,
            'left': cart.offset().left + 30,
            'width': 75,
            'height': 75
        }, 1000, 'easeInOutExpo');

        setTimeout(function () {
            count++;
            $(".cart-nav .item-count").text(count);
        }, 1500);

        imgclone.animate({
            'width': 0,
            'height': 0
        }, function () {
            $(this).detach()
        });
    }
    });

$('.add-cart-btn').on('click', function () {
    var pc = $(this).parent('.info').parent('.popup-card').parent().parent().prev();
    let inputValue = pc.find("input").eq(0);
    SaveItem(inputValue.attr('id'), inputValue.val());
    let checkBox = pc.find(".checkbox").eq(0);
    checkBoxCkecked(checkBox);
});

function checkBoxCkecked(checkBox) {
    checkBox.show();
    checkBox.prop("checked", true);
    checkBox.parent('.added2cart').css('opacity', '1');
    checkBox.parent('.added2cart').next('.add2cart').css('display', 'none');
}

$.each($('.product-card'), function () {
    let checkBox = $(this).find(".checkbox").eq(0);
    let input = $(this).find("input").eq(0);
    for (i = 0; i <= localStorage.length - 1; i++) {
        key = localStorage.key(i);
        console.log(key, input.attr('id'));
        if (key == input.attr('id'))
        checkBoxCkecked(checkBox);
    }
    
});
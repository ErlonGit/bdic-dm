$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
util = function(){
	var _setNameUser = function(){
		$(".userName").each(function( index ) {
			 valElement = $(this).html();
			 valElement = valElement.replace("userName", $.sessionStorage.getItem('userName'));
			 $(this).html(valElement);
		});
	}
	var _logout = function(){
		$.sessionStorage.clear();
		window.location = "/";	
	}
	var _formatReal = function(int){
        var tmp = int+'';
		decimal = tmp.split(".");
		if(typeof decimal[1] == "undefined") {
			tmp = tmp + '00';
		}else if(decimal[1].length < 2){
			tmp = tmp + '0';
		}
        tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
		if(tmp.search('.') != -1)
			tmp = tmp.replace('.','');
		
        if( tmp.length > 6 )
                tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
				
        return tmp;
	}
	var _load_details_product = function(id){
		$.ajax({
            type: 'GET',
			async: false,
			dataType: "json",
            url: 'api/products/details/'+id,
            success: function (data) {
				$("#modal1 #descricaoProduto").html(data.descricao);
				$("#modal1 #imagemProduto").attr('src',data.imagem);
				$("#modal1 #observacaoProduto").html(data.observacao);
				$("#modal1 #precoProduto").html('R$ '+util.formatReal(data.valor));
				$("#modal1 #btnComprar").attr('onclick','util.addProductCart('+id+');');
				$("#modal1").openModal();
            },
			statusCode: {
				400: function(error) {
				  Materialize.toast(error.responseJSON.status, 4000);
				}
			}
        });
	}
	var _addProductCart = function(id){
	//$.sessionStorage.clear();
		Materialize.toast('Item adicionado no carrinho!', 4000);
		cartNow = $.sessionStorage.getItem('cartProducts');
		if(cartNow == null){		
			var cart = [
				{
					"id": id,
					"imagem": $("#modal1 #imagemProduto").attr('src'),
					"descricao":$("#modal1 #descricaoProduto").html(),
					"quantidade":$("#modal1 #quantity").val(),
					"valor": $("#modal1 #precoProduto").html().replace('R$ ','')
				}
			];
		$.sessionStorage.setItem('cartProducts', JSON.stringify(cart));
		}else{
			$.each(JSON.parse(cartNow), function(index, item) {
					console.log(item.id);
			});
		}
	}
	return {
		setNameUser: _setNameUser,
		logout: _logout,
		formatReal: _formatReal,
		load_details_product: _load_details_product,
		addProductCart: _addProductCart
	}
}();
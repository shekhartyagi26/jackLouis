angular.module('productuploadControllers',[])
.controller('proupCtrl',function($http){
var app=this;
this.productUser=function(productData){
	console.log('form submitted');
	console.log(this.productData);
	$http.post('api/product',this.productData).then(function(data){
		console.log(data.data.success);
		console.log(data.data.message);
		if(data.data.success)
		{
			app.successMsg=data.data.message;

		}
		else{
			app.errorMsg=data.data.message;
		}

	});
};
})

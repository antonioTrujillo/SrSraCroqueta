
var findProveedor = function(array,id){
	for(var i = 0, m=null; i<array.length; ++i){
		if(array[i].id == id){
			return array [i];
			//break;	
		};
		
	};
};


(function(){
var DATA= "data/proveedores.json";
var RESTAURANTS= "data/restaurants.json";
var app=angular.module("myApp",["ngRoute","ngMap","ngAnimate"]);

app.config(["$routeProvider","$locationProvider",function($routeProvider,$locationProvider){
			$locationProvider.html5Mode(true);
		

		$routeProvider.when("/",{
			templateUrl:"templates/home.html",
			controller:"indexController",
			controllerAs:"home"
		});
		$routeProvider.when("/formulario",{//formulario
			templateUrl:"templates/form.html",
			controllerAs:"form"
		});
		$routeProvider.when("/ShowSuppliers/:proveedorId",{//mapa
			templateUrl:"templates/show.html",
			controller:"showController",
			controllerAs:"show"
		});
		$routeProvider.when("",{//mapa
			templateUrl:"templates/show.html",
			controller:"showController",
			controllerAs:"restaurant"
		});
		$routeProvider.when("/DIY",{
			templateUrl:"templates/diy.html",
			controller:"diyController",
			controllerAs:"diy"
		});

		
}]);

app.directive("appHeader", function(){
	return{
		restrict:"AE",
		templateUrl:"components/header.html"
	};
});
app.directive("appFooter", function(){
	return{
		templateUrl:"components/footer.html"
	};
});
app.directive("appProviders", function(){
	return{
		restrict: "AE",
		templateUrl:"components/providers.html"

	};
});
app.directive("appDescriptions", function(){
	return{
		restrict: "AE",
		templateUrl:"components/description.html"

	};
});


//................carousel...............................
app.controller("indexController", function($scope,$http){
	$http.get(DATA).then(function(data){
		$scope.proveedores = data.data
	});
	$scope.viewLoaded= function(){
		$(".carousel").carousel()
	}
});
app.controller("diyController", function($scope, $http){

function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function() {
    $("form").on("submit", function(e) {
       e.preventDefault();
       // prepare the request
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            maxResults: 5,
            order: "viewCount",
            publishedAfter: "2015-01-01T00:00:00Z"
       }); 
       // execute the request
       request.execute(function(response) {
          var results = response.result;
          $("#results").html("");
          $.each(results.items, function(index, item) {
            $.get("components/item.html", function(data) {
                $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
            });
          });
          resetVideoHeight();
       });
    });
    
    $(window).on("resize", resetVideoHeight);
});

function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}

function init() {
    gapi.client.setApiKey("AIzaSyAFR9xkastixhFBtcNpdQoRC855JuZWflo");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
}


});
//................seccion mapa...............................
app.controller("showController", function($scope,$routeParams,$http){
	$http.get(DATA).then(function(id){
		var Id =$routeParams.proveedorId;
		var proveedor= id.data;
		$scope.proveedor= findProveedor(proveedor,Id);
	});
	$http.get(RESTAURANTS).then(function(data){
		$scope.restaurants = data.data
		console.log($scope.restaurants);
	});

		 $scope.myVar = false;
    $scope.toggle = function() {
        $scope.myVar = !$scope.myVar;
    };
     $scope.filters = { };
});

//......animation del marker......

 app.controller('MarkerAnimationCtrl', function() {
   var vm = this;
   vm.toggleBounce = function() {
     if (this.getAnimation() != null) {
       this.setAnimation(null);
     } else {
       this.setAnimation(google.maps.Animation.BOUNCE);
     }
   }
 });

})();


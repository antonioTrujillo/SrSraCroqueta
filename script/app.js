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
var app=angular.module("myApp",["ngRoute","ngMap"]);

app.config(["$routeProvider","$locationProvider",function($routeProvider,$locationProvider){
            $locationProvider.html5Mode(true);
        
        $routeProvider.when("/",{
            templateUrl:"templates/home.html",
            controller:"indexController",
            controllerAs:"home"
        });
        $routeProvider.when("/formulario",{//formulario
            templateUrl:"templates/form.html",
            controller:"indexController",
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


app.controller("indexController", function($scope,$http){
    $http.get(DATA).then(function(data){
        $scope.proveedores = data.data
    });
//................carousel...............................
    $scope.viewLoaded= function(){
        $(".carousel").carousel()
    }
//................form...............................
      $scope.submitForm = function() {
          if ($scope.userForm.$valid) {
sweetAlert('Muchas Gracias!', 'Tu mensaje ha sido enviado correctamente','success');          }
      };
});
app.controller("diyController", function($scope, $http){
//................diy/api...............................
function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function() {
    $("form").on("submit", function(e) {
       e.preventDefault();
       // prepare the request
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            maxResults: 24,
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
        // youtubet api is ready
    });
}


});
app.controller("showController", function($scope,$routeParams,$http){
    $http.get(DATA).then(function(id){
        var Id =$routeParams.proveedorId;
        var proveedor= id.data;
        $scope.proveedor= findProveedor(proveedor,Id);
    });
    
//........Toggle Descriptions...........................................
        $scope.myVar = false;
    $scope.toggle = function() {
        $scope.myVar = !$scope.myVar;
    };
     $scope.filters = { };  
});

 app.controller('MarkerAnimationCtrl', function($scope) {
 
 //......animation del marker............................................  
   $scope.toggleBounce = function() {
     if (this.getAnimation() != null) {
       this.setAnimation(null);
     } else {
       this.setAnimation(google.maps.Animation.BOUNCE);
     }
   }
 });


app.run(function($rootScope, NgMap) {
  NgMap.getMap().then(function(map) {
    $rootScope.map = map;
  });
});




//cierre de function principal
})();




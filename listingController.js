angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    $scope.listings = Listings;
    $scope.detailedInfo = undefined;
    $scope.view_entry;
    $scope.searched_listings = $scope.listings;
    $scope.additional_entry;


    $scope.addListing = function() 
    {
        if($scope.additional_entry === undefined)
        {
            return;
        }

        if($scope.additional_entry.code === undefined || $scope.additional_entry.name === undefined)
        {
            window.alert("Entries must have a code and a building name");
            return;
        }

        var copy = angular.copy($scope.additional_entry);
        $scope.additional_entry = angular.copy($scope.master);
        console.log(copy)
        $scope.listings.push(copy);

    };
    $scope.deleteListing = function(index) 
    {
        $scope.listings.forEach(function(element) {
            if(element.code == index)
            {
                var i = $scope.listings.indexOf(element);
                if(i != -1) {
                    $scope.listings.splice(i, 1);
                }
                return;
            }
        });
        console.log(index);
    };
    $scope.showDetails = function(index) 
    {
        $scope.listings.forEach(function(element) {
            if(element.code == index)
            {
                $scope.view_entry = element;
                return;
            }
        });
    };
  }
]);
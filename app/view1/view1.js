app.controller('View1Ctrl', ["$scope", "$http", function ($scope, $http) {

  $scope.submit_text = "Submit";

  $scope.addData = function (crudData) {
    console.log(crudData);

    if ($scope.submit_text == "Submit") {
      var file = $scope.file;
      console.log('file is ');
      console.dir(file);

      var fd = new FormData();
      fd.append('file', file);
      //fd.append("data", angular.toJson(crudData));
      fd.append("crud_data", angular.toJson(crudData));

      $http.post('http://localhost:3000/crud/addCrud', fd, {
        transformRequest: angular.identity,
        headers: { 'Content-Type': undefined }
      }).then(function (res) {
        console.log(res);
        alert(res.data.message);
        window.location.reload();
      }, function (err) {
        console.log(err);
        alert(res.data.message);
      });
    }
    else {
      var file = $scope.file;
      var fd = new FormData();
      fd.append('file', file);
      fd.append("crud_data", angular.toJson(crudData));
      // $http({
      //   method: 'POST',
      //   url: 'http://localhost:3000/crud/updateCrud',
      //   data: { id: $scope.crudDataId, update_data: crudData }
      // }).then(function (res) {
      //   console.log(res);
      //   alert(res.data.message);
      //   window.location.reload();
      // }, function (error) {
      //   console.log(error);
      // });

      $http.post('http://localhost:3000/crud/updateCrud', fd, {
        transformRequest: angular.identity,
        headers: { 'Content-Type': undefined }
      }).then(function (res) {
        console.log(res);
        alert(res.data.message);
        window.location.reload();
      }, function (err) {
        console.log(err);
        alert(res.data.message);
      });
    }
  }

  $scope.getData = function () {
    $http.get('http://localhost:3000/crud/getCrud')
      .then(function (res) {
        var data = res.data.data;

        console.log(data);
        $scope.get_crud_data = data;
      });

    // $scope.gridOptions = {
    //   enableFiltering: true,
    //   data: 'crud_data',
    //   columnDefs: [
    //     { name: 'firstName' },
    //     { name: 'lastName' },
    //     { name: 'address' },
    //     { name: 'city' },
    //     { name: 'pincode' }
    //   ]
    // };

    // $scope.myData = [
    //   {
    //     'first-name': 'Cox',
    //     friends: ['friend0'],
    //     address: {street: '301 Dove Ave', city: 'Laurel', zip: '39565'}
    //       }
    //   ];

    $scope.gridOptions = {
      enableFiltering: true,
      enableSorting: true,
      columnDefs: [
        { name: 's.No', cellTemplate: '<div class="ui-grid-cell-contents ng-scope"><span>{{rowRenderIndex+1}}</span></div>' },
        { name: 'firstName', field: 'firstName' },
        { name: 'lastName', field: 'lastName' },
        { name: 'address', field: 'address' },
        { name: 'city', field: 'city' },
        { name: 'pincode', field: 'pincode' },
        { name: 'edit', cellTemplate: '<div class="ui-grid-cell-contents ng-scope"><button type="button" class="btn btn-warning btn-sm" ng-click="grid.appScope.editClick(row.entity)">Edit</button></div>' },
        { name: 'delete', cellTemplate: '<div class="ui-grid-cell-contents ng-scope"><button type="button" class="btn btn-danger btn-sm" ng-click="grid.appScope.deleteClick(row.entity)">Delete</button></div>' }
      ],
      data: 'get_crud_data'
    };
  }

  $scope.editClick = function (rowdata) {
    console.log(rowdata)

    //$scope.rowData = rowdata;
    $scope.crud_data = {};
    $scope.crud_data.firstName = rowdata.firstName;
    $scope.crud_data.lastName = rowdata.lastName;
    $scope.crud_data.address = rowdata.address;
    $scope.crud_data.city = rowdata.city;
    $scope.crud_data.pincode = rowdata.pincode;

    $scope.crudDataId = rowdata._id;

    $scope.submit_text = "Update"
  }

  $scope.deleteClick = function (rowdata) {
    $http({
      method: 'POST',
      url: 'http://localhost:3000/crud/deleteCrud',
      data: { id: rowdata._id, imgKey: rowdata.image}
    }).then(function (res) {
      console.log(res);
      alert(res.data.message);
      window.location.reload();
    }, function (error) {
      console.log(error);
    });
  }

  $scope.getData();

}])
  // .directive('crudForm', function () {
  //   return {
  //     restrict: 'E',
  //     scope:
  //     {
  //       firstname: "=",
  //       lastname: "=",
  //       address: "=",
  //       city: "=",
  //       pincode: "=",
  //       subtext: "=",
  //       addData: "&",
  //     },
  //     templateUrl: './view1/crud.html',
  //     link: function(scope, element, attrs) {
  //       scope.callAddData = function (data) {
  //         scope.addData({crudData: data});
  //       }
  //     }
  //   };
  // })
  .directive('crudData', function () {
    return {
      restrict: 'E',
      templateUrl: './view1/crud_data.html'
    };
  })

app.directive('file', function () {
  return {
    restrict: 'AE',
    scope: {
      file: '@'
    },
    link: function (scope, el, attrs) {
      el.bind('change', function (event) {
        var files = event.target.files;
        var file = files[0];
        scope.file = file;
        scope.$parent.file = file;
        scope.$apply();
      });
    }
  };
});
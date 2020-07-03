var app = angular.module('app', ['ui.router', 'ui.grid']);

app.config(function($stateProvider, $urlServiceProvider) {
  $urlServiceProvider.rules.otherwise({ state: 'home' });
  var helloState = {
    url: '/home',
    templateUrl: './view1/view1.html',
    controller: 'View1Ctrl'
  }

  // var aboutState = {
  //   url: '/about',
  //   template: '<h3>Its the UI-Router flow</h3><br><p>This is a crud app</p>',
  //   controller: 'View2Ctrl'
  // }

  var aboutState = {
    url: '/about',
    templateUrl: './view2/about.html',
    controller: 'View2Ctrl'
  }

  $stateProvider.state('home',helloState);
  $stateProvider.state('about',aboutState);
});


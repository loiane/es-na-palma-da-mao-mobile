export function inputReturn($window) {
  return {
    restrict: 'A',
    link: function linkFn($scope, $elem, $attrs) {
      $elem.on('keyup', function (event) {
        if (event.keyCode === 13) {
          if ($scope.vm.keyboardReturn) {
            $scope.vm.keyboardReturn( event.target.value );
          }
          if ($window.cordova) {
            window.cordova.plugins.Keyboard.close();
          }
        }
      });
    }
  };
}

inputReturn.$inject = ['$window'];

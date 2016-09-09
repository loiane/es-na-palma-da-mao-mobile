export function removeEmailValidation() {
    return {
        require: 'ngModel',
        link: function ( $scope, element, attrs, ngModel ) {
            ngModel.$validators[ 'email' ] = function () {
                return true;
            };
        }
    };
};

const directive = () => {
    return {
        template: '<div class="accent" flex><ng-transclude></ng-transclude></div>',
        transclude: true,
        restrict: 'E',
        replace: true,
        scope: true
    };
};

export default directive;
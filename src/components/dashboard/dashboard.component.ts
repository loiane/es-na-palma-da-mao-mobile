import './dashboard.component.css!';
import template from './dashboard.component.html!text';
import DashboardController from './dashboard.component.controller';

const directive = () => {
    return {
        template: template,
        controller: DashboardController,
        restrict: 'E',
        controllerAs: 'vm', //scope: {},
        replace: true,
        bindToController: true
    };
};

export default directive;

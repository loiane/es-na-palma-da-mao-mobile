import './login.component.css!';
import template from './login.component.html!text';
import LoginController from './login.component.controller.js';

const directive = () => {
    return {
        template: template,
        controller: LoginController,
        restrict: 'E',
        controllerAs: 'vm', //scope: {},
        replace: true,
        bindToController: true
    };
};

export default directive;

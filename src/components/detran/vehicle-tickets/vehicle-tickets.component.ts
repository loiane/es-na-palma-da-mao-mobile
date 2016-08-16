import './car-tickets.component.css';
import template from './car-tickets.componenent.html';
import { CarTicketsController } from './car-tickets.component.controller';

const directive = () => {
    return {
        template: template,
        controller: CarTicketsController,
        restrict: 'E',
        controllerAs: 'vm', // scope: {},
        replace: true,
        bindToController: true
    };
};

export default directive;

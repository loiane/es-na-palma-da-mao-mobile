import './bus-lines.component.css';
import template from './bus-lines.component.html';
import { BusLinesController } from './bus-lines.component.controller';

const directive = () => {
    return {
        template: template,
        controller: BusLinesController,
        restrict: 'E',
        controllerAs: 'vm', // scope: {},
        replace: true,
        bindToController: true
    };
};

export default directive;

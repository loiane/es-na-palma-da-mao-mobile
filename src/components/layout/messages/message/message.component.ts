import './message.component.css';
import template from './message.component.html';
import { MessageController } from './message.component.controller';

const directive = () => {
    return {
        template: template,
        transclude: true,
        controller: MessageController,
        restrict: 'E',
        controllerAs: 'vm',
        replace: false,
        scope: true,
        bindToController: {
            text: '@'
        }
    };
};

export default directive;
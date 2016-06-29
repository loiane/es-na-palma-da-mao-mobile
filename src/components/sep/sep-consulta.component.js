import './sep-consulta.component.css!';
import template from './sep-consulta.component.html!text';
import SepConsultaController from './sep-consulta.component.controller.js';

const directive = () => {
    return {
        template: template,
        controller: SepConsultaController,
        restrict: 'E',
        controllerAs: 'vm', //scope: {},
        replace: true,
        bindToController: true
    };
};

export default directive;

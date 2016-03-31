import 'angular-ui-router';
import angular from 'angular';

import './configuracoes.css!';
import ConfiguracoesController from './configuracoes.controller';
import configuracoesRoutes from './configuracoes.routes';

const dependencies = [
    'ui.router'
];

export default angular.module( 'configuracoes-state', dependencies )
                      .controller( 'configuracoesController', ConfiguracoesController )
                      .config( configuracoesRoutes );





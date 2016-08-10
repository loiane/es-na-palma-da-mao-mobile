import './news-list.component.css';
import template from './news-list.component.html';
import { NewsListController } from './news-list.component.controller';

const directive = () => {
    return {
        template: template,
        controller: NewsListController,
        restrict: 'E',
        controllerAs: 'vm', // scope: {},
        replace: true,
        bindToController: true
    };
};

export default directive;

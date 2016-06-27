import './news-detail.component.css!';
import template from './news-detail.component.html!text';
import NewsDetailController from './news-detail.component.controller.js';

const directive = () => {
    return {
        template: template,
        controller: NewsDetailController,
        restrict: 'E',
        controllerAs: 'vm', //scope: {},
        replace: true,
        bindToController: true
    };
};

export default directive;




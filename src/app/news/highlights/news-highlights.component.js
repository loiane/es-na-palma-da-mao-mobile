import './news-highlights.component.css!';
import template from './news-highlights.component.html!text';
import NewsHighlightsController from './news-highlights.component.controller.js';

const directive = () => {
    return {
        template: template,
        controller: NewsHighlightsController,
        restrict: 'E',
        controllerAs: 'vm', //scope: {},
        replace: true,
        bindToController: true
    };
};

export default directive;

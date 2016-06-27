import angular from 'angular';
import 'angular-ui-router';

import newsHighlightsComponent from './news-highlights.component.js';
import newsShared from '../shared/index.js';

const dependencies = [
    'ui.router', newsShared.name
];

export default angular.module( 'news-highlights.component', dependencies )
                      .directive( 'newsHighlights', newsHighlightsComponent )
                      .config( [
                          '$stateProvider', $stateProvider => $stateProvider
                              .state( 'app.dashboard.newsHighlights', {
                                  url: '',
                                  data: { title: 'DESTAQUES' },
                                  nativeTransitions: null,
                                  views: {
                                      'tab-news': {
                                          template: '<news-highlights></news-highlights>'
                                      }
                                  }
                              } )
                      ] );

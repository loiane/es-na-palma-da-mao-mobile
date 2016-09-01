import angular from 'angular';
import HighlightComponent from './highlight.component';

export default angular.module( 'highlight.component', [] )
                      .directive( 'highlight', HighlightComponent ) ;
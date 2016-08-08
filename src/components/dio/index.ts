import 'angular-ui-router';

import SearchComponent from './search/index';
import LatestComponent from './latest/index';

let dependencies = [
    'ui.router', LatestComponent.name, SearchComponent.name
];

export default angular.module( 'dio', dependencies );
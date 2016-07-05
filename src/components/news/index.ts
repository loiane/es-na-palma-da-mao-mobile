import detail from './detail/index';
import highlights from './highlights/index';
import list from './list/index';

let dependencies = [
    detail.name, highlights.name, list.name
];

export default angular.module( 'news', dependencies );

import detail from './detail/index.js';
import highlights from './highlights/index.js';
import list from './list/index.js';

let dependencies = [
    detail.name, highlights.name, list.name
];

export default angular.module( 'news', dependencies );

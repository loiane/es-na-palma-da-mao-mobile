import busInfo  from './bus-info/index';
import busLines from './bus-lines/index';
import shared from './shared/index';

let dependencies = [
    busInfo.name, busLines.name, shared.name
];

export default angular.module( 'ceturb', dependencies );
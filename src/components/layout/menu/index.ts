import menuComponent from './menu.component';
import detranShared from '../../detran/shared/index';

export default angular.module( 'layout.menu', [ detranShared.name ] )
                      .directive( 'menu', menuComponent );


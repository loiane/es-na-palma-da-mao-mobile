import routesConfig from './routes.config';
import statesJson from './states.json';

export default angular.module( 'shared.routes', [] )
                      .config( routesConfig );

export * from './model/index';
export { statesJson };


import './web/storage.css!css!platform';
import StorageController from './storage.controller.js';
import storageRoutes from './storage.routes.js';

export default angular.module( 'storage-state', [] )
                      .controller( 'storageController', StorageController )
                      .config( storageRoutes );


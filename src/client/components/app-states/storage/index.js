import './storage.css!css';
import StorageController from './storage.controller.js';
import storageRoutes from './storage.routes.js';

export default angular.module( 'storage-state', [] )
                      .controller( 'storageController', StorageController )
                      .config( storageRoutes );


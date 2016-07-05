import './driver-license-status.component.css!';
import template from './driver-license-status.component.html!text';
import DriverLicenseStatusController from './driver-license-status.component.controller.js';

const directive = () => {
    return {
        template: template,
        controller: DriverLicenseStatusController,
        restrict: 'E',
        controllerAs: 'vm', //scope: {},
        replace: true,
        bindToController: true
    };
};

export default directive;

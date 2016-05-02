import template from './toast.tpl.html!text';

/**
 * Supplies a function that will continue to operate until the
 * time is up.
 */

/**
 * Controller
 */
class ToastService {

    /**
     * Toast service: exibe notificações no estilo toasts
     *
     * @constructor
     *
     * @param {Object} $mdToast - $mdToast service do angular-material
     *
     * @returns {void}
     */
    constructor( $mdToast ) {
        this.$mdToast = $mdToast;
    }

    /**
     * Exibe notificação
     *
     * @param {string} displayOption - opções de exibição do toast usados para preencher a view
     *
     * @returns {Promise}
     */
    show( displayOption ) {
        return this.$mdToast.show( {
            controller: 'toastController',
            controllerAs: 'vm',
            template: template,
            hideDelay: 800,
            position: 'bottom right',
            locals: {
                displayOption: displayOption
            }
        } );
    }

    /**
     *
     * @returns {*}
     */
    hide() {
        return this.$mdToast.hide();
    }

    /**
     *
     * @param displayOption
     * @returns {Promise}
     */
    success( displayOption ) {
        return this.show( angular.merge( displayOption, { type: 'success' } ) );
    }

    /**
     *
     * @param displayOption
     * @returns {Promise}
     */
    error( displayOption ) {
        return this.show( angular.merge( displayOption, { type: 'error' } ) );
    }

    /**
     *
     * @param displayOption
     * @returns {Promise}
     */
    info( displayOption ) {
        return this.show( angular.merge( displayOption, { type: 'info' } ) );
    }

    /**
     *
     * @param displayOption
     * @returns {Promise}
     */
    warn( displayOption ) {
        return this.show( angular.merge( displayOption, { type: 'info' } ) );
    }
}

export default [
    '$mdToast', ToastService
];

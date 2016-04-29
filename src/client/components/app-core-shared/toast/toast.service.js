import template from './toast.tpl.html!text';

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
            position: 'top',
            locals: {
                displayOption: displayOption
            }
        } );
    }
}

export default [
    '$mdToast', ToastService
];

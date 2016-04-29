/**
 *
 */
class StorageController {

    /**
     * @constructor
     *
     * @param {Object} toast - toast service
     * @param {Object} dialog - dialog service
     *
     * @returns {void}
     */
    constructor( toast, dialog ) {
        this.toast = toast;
        this.dialog = dialog;

        this.activate();
    }

    /**
     * Ativa o controller
     *
     * @returns {void}
     */
    activate() {
        console.log( 'storage controller' );
    }

    /**
     * Notifica o usuário
     *
     * @param {string } msg - A mensagem sendo exibida
     *
     * @returns {void}
     */
    showToast( msg ) {
        this.toast.show( {
            title: `Indo para  ${msg}!!`
        } );
    }

    /**
     * Exibe confirm
     *
     * @param {Object} $event - o evento de click que dispara o dialog
     *
     * @returns {void}
     */
    showConfirm( $event ) {

        const onConfirm = () => {
            this.toast.show( {
                title: 'Voltou com sucesso!'
            } );
        };

        const onCancel = () => {
            this.toast.show( {
                title: 'Cancelou!'
            } );
        };

        this.dialog.confirm( {
            targetEvent: $event,
            title: 'Deseja mesmo voltar?',
            content: 'Confirme para poder voltar.'
        } )
            .then( onConfirm, onCancel );
    }

    /**
     * Exibe alert
     *
     * @param {Object} $event - o evento de click que dispara o dialog
     *
     * @returns {void}
     */
    showAlert( $event ) {

        const onConfirm = () => {
            this.toast.show( {
                title: 'Alert fechado sucesso!'
            } );
        };

        this.dialog.alert( {
            targetEvent: $event,
            title: 'Você clicou num alert',
            content: 'Obrigado po me testar'
        } )
            .then( onConfirm );
    }
}

export default [ 'toast', 'dialog', StorageController ];

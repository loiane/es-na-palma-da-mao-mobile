import toastr from 'toastr';
import 'toastr/build/toastr.css!';

export default [ '$log', logger ];

/**
 * Factory para serviço de notificação da aplicação
 * @param {Object} $log - $log service do angular
 *
 * @returns {{showToasts: boolean, error: error, info: info, success: success, warning: warning, log: $log.log}}
 */
function logger( $log ) {

    let service = {
        showToasts: true,

        error: error,
        info: info,
        success: success,
        warning: warning,

        //bypass toastr (usa console)
        log: $log.log
    };

    return service;

    ////////////////////////////////////////////////////////////

    /**
     * Exibe notificação de erro
     *
     * @param {Object} message - a mensagem sendo exibida
     * @param {Object} data - dados extras
     * @param {Object} title - título da mensagem
     *
     * @returns {void}
     */
    function error( message, data, title ) {
        toastr.error( message, title );
        $log.error( `Erro: ${message}`, data );
    }

    /**
     * Exibe notificação de info
     *
     * @param {Object} message - a mensagem sendo exibida
     * @param {Object} data - dados extras
     * @param {Object} title - título da mensagem
     *
     * @returns {void}
     */
    function info( message, data, title ) {
        toastr.info( message, title );
        $log.info( `Informação: ${message}`, data );
    }

    /**
     * Exibe notificação de sucesso
     *
     * @param {Object} message - a mensagem sendo exibida
     * @param {Object} data - dados extras
     * @param {Object} title - título da mensagem
     *
     * @returns {void}
     */
    function success( message, data, title ) {
        toastr.success( message, title );
        $log.info( `Sucesso: ${message}`, data );
    }

    /**
     * Exibe notificação de warning
     *
     * @param {Object} message - a mensagem sendo exibida
     * @param {Object} data - dados extras
     * @param {Object} title - título da mensagem
     *
     * @returns {void}
     */
    function warning( message, data, title ) {
        toastr.warning( message, title );
        $log.warn( `Atenção: ${message}`, data );
    }
}

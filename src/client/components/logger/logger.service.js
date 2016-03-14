import toastr from 'toastr';
import 'toastr/build/toastr.css!';

export default ['$log', logger];

/* @ngInject */
function logger($log) {
   
   let service = {
        showToasts: true,

        error   : error,
        info    : info,
        success : success,
        warning : warning,

        //bypass toastr (use console)
        log     : $log.log
    };

    return service;
    
    ////////////////////////////////////////////////////////////

    function error(message, data, title) {
        toastr.error(message, title);
        $log.error(`Erro: ${message}`, data);
    }

    function info(message, data, title) {
        toastr.info(message, title);
        $log.info(`Informação: ${message}`, data);
    }

    function success(message, data, title) {
        toastr.success(message, title);
        $log.info(`Sucesso: ${message}`, data);
    }

    function warning(message, data, title) {
        toastr.warning(message, title);
        $log.warn(`Atenção: ${message}`, data);
    }
}
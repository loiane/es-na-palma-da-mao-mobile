'use strict';

System.register(['toastr', 'toastr/build/toastr.css!'], function (_export, _context) {
    var toastr;

    function logger($log) {

        var service = {
            showToasts: true,

            error: error,
            info: info,
            success: success,
            warning: warning,

            log: $log.log
        };

        return service;

        function error(message, data, title) {
            toastr.error(message, title);
            $log.error('Erro: ' + message, data);
        }

        function info(message, data, title) {
            toastr.info(message, title);
            $log.info('Informação: ' + message, data);
        }

        function success(message, data, title) {
            toastr.success(message, title);
            $log.info('Sucesso: ' + message, data);
        }

        function warning(message, data, title) {
            toastr.warning(message, title);
            $log.warn('Atenção: ' + message, data);
        }
    }
    return {
        setters: [function (_toastr) {
            toastr = _toastr.default;
        }, function (_toastrBuildToastrCss) {}],
        execute: function () {
            _export('default', ['$log', logger]);
        }
    };
});
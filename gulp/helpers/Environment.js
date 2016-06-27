import gutil from 'gulp-util';

/**
 *
 */
class Environment {

    /**
     * @constructor
     */
    constructor() {
        this._name = process.env.NODE_ENV || 'desenvolvimento';
        this._port = process.env.PORT || '3000';

        gutil.log( gutil.colors.blue( `Executando em: ${this._name}` ) );
    }

    /**
     * Verifica se é ambiente de produção
     *
     * @returns {boolean} - Bool indicando se é ambiente de produção
     */
    isProduction() {
        return this._name === 'produção';
    }

    /**
     * Verifica se é ambiente de desenvolvimento
     *
     * @returns {boolean} - Bool indicando se é ambiente de desenvolvimento
     */
    isDevelopment() {
        return this._name === 'desenvolvimento';
    }

    /**
     * Verifica se é ambiente de sandbox
     *
     * @returns {boolean} -  Bool indicando se é ambiente de sandbox
     */
    isSandbox() {
        return this._name === 'sandbox';
    }

    /**
     * Verifica se é ambiente de demo
     *
     * @returns {boolean} - Bool indicando se é ambiente de demo
     */
    isDemo() {
        return this._name === 'demo';
    }

    /**
     *
     * @returns {*|string} - O nome do ambiente de execução
     */
    name() {
        return this._name;
    }

    /**
     *
     * @returns {Number} - O número da porta
     */
    port() {
        return this._port;
    }
}

export default Environment;

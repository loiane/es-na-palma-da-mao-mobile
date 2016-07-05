/** @class */
class DetranApiService {

    /**
     * @param {Object} $http - angular $http service
     * @param {Object} settings - application settings
     * @constructor
     */
    constructor( $http, settings ) {
        this.$http = $http;
        this.settings = settings;
    }

    /**
     * @param {string} id: Person identification (CPF)
     * @returns {Object} angular HTTP promisse with response.data
     * //TODO: Refact after api is done
     *
     * Promisse return:
     * {
     *  Situacao {int}: default = 0, blocked = 1
     *  MotivoBloqueio {string}: optional
     *  DataVencimento {DateTime}: Expiration date
     *  ExisteInfracoesPontuadas {bool}: Possui ponto na carteira
     *  ExisteProcessoAberto {bool}: Deu início em um processo de habilitação
     *  ExisteProcessoAdministrativoAberto {bool}: Existe processo administrativo aberto
     * }
     */
    getDriverLicenseData( id ) {
        return this.$http
            .get( `${this.settings.api.detran}/driverLicenseData/${id}` )
            .then( response => response.data );
    }

    /**
     * @param {string} id: Person identification (CPF)
     * @returns {Object} angular HTTP promisse with response.data
     *
     * Promisse return:
     * [ {
     *   long codinfracao;
     *   string autoinfracao;
     *   string codorgaoautuador;
     *   string descorgaoautuador;
     *   string codinfracaoctb;
     *   string desctipoinfracao;
     *   string descclassificacaoinfracao;
     *   byte pontuacao;
     *   string localinfracao;
     *   string municipioinfracao;
     *   DateTime data;
     *   string hora;
     *   string placa;
     *   string descorigem;
     *   string descregraprocessamento;
     *   int numprotocolo;
     *   byte codsituacaoinfracao;
     *   string descsituacaoinfracao;
     *   byte suspensaodireta;
     *   DateTime datahora;
     *   string artigo;
     *   bool Advertencia;
     * } ]
     */
    getTickets( id ) {
        return this.$http
            .get( `${this.settings.api.detran}/tickets/${id}` )
            .then( response => response.data );
    }

    /**
     * @param {string} id: Person identification (CPF)
     * @returns {Object} angular HTTP promisse with response.data
     *
     * Promisse return:
     * [ {
     *   long numprocessoadm
     *   decimal numprotocolo
     *   int tipocondutor
     *   decimal registro
     *   DateTime dataabertura
     *   string desctipobloqueio
     *   string nomecondutor
     *   string cpf
     *   string descsituacaoprocessoadm
     *   byte codsituacaoprocessoadm
     * } ]
     */
    getAdministrativeCharges( id ) {
        return this.$http
            .get( `${this.settings.api.detran}/administrativeCharges/${id}` )
            .then( response => response.data );
    }

    /**
     * @param {string} id: Person identification (CPF)
     * @returns {Object} angular HTTP promisse with response.data
     * [ {
     *   decimal num_processo
     *   string CODCATEGPRETEND
     *   string codcategpretendexame
     *   string CategReal
     *   string NUMCPF
     *   string usuario
     *   string tipodocumento
     *   string NUMDOCUMENTO
     *   string CODORGEXPEDIDOR
     *   string Sigla_UF_Documento_Id
     *   decimal numregistrocnh
     *   string ufpgu
     *   decimal numpgu
     *   string nacionalidade
     *   string naturalidade
     *   string DATANASCIMENTO
     *   string ufnascimento
     *   DateTime dataaberturaproc
     *   DateTime dataconclusaoproc
     *   string indprofissional
     *   string Requerimentos
     *   string descsitprocesso
     *   int codsitprocesso
     *   int codconveniada
     *   int endmunicipio
     *   string AR_Correios
     *   int codcfc
     *   int CNHSocial
     *   int CodSituacaoBeneficioCNHSocial
     *   long CodCaptura
     *   int CapturaRealizada
     *   bool Transacao151Pendente
     *   DateTime dataValidadeProcesso
     * } ]
     */
    getDriverLicenseProcess( id ) {
        return this.$http
            .get( `${this.settings.api.detran}/driverLicenseProcess/${id}` )
            .then( response => response.data );
    }
}

DetranApiService.$inject = [ '$http', 'settings' ];

export default DetranApiService;

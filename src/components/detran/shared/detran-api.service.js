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
    getDriverData() {
        return this.$http
            .get( `${this.settings.api.detran}/driverData` )
            .then( response => {
                return response.data;
            } )
            .catch( ( error ) => {
                console.log( error );
            } );
    }

    /**
     * @param {string} id: Person identification (CPF)
     * @returns {Object} angular HTTP promisse with response.data
     *
     * Promisse return:
     * [ {
     *      classification: "MÉDIA"
     *      date: "2013-09-06T20:12:00-03:00"
     *      description: "ESTACIONAR O VEÍCULO EM LOCAIS E HORÁRIOS PROIBIDOS ESPECIFICAMENTE PELA SINALIZAÇÃO (PLACA - PROIBIDO ESTACIONAR)."
     *      district: "VITORIA"
     *      place: "R. DR. MOACYR GONCALVES                           "
     *      plate: "MQH9400"
     *      points: "4"
     *      warning: "false"
     * } ]
     */
    getTickets() {
        return this.$http
            .get( `${this.settings.api.detran}/tickets ` )
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
    getAdministrativeCharges() {
        return this.$http
            .get( `${this.settings.api.detran}/administrativeCharges ` )
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
    getDriverLicenseProcess() {
        return this.$http
            .get( `${this.settings.api.detran}/driverLicenseProcess ` )
            .then( response => response.data );
    }
}

DetranApiService.$inject = [ '$http', 'settings' ];

export default DetranApiService;

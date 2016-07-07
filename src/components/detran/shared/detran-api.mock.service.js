import sinon from 'sinon';

export default class MockDetranApi {

    constructor() {
        //this.sinon = sinon.sandbox.create();
    }

    getDriverData() {
        return sinon.stub().returnsPromise().resolvel( {
            status: 0,
            blockMotive: '',
            expirationDate: '2017-09-28T00:00:00',
            hasTickets: true,
            acquiringLicense: false,
            hasAdministrativeIssues: false
        } );
    }

    getTickets() {
        return sinon.stub().returnsPromise().resolvel( [ {
            description: 'ESTACIONAR O VEÍCULO EM LOCAIS E HORÁRIOS PROIBIDOS ESPECIFICAMENTE PELA SINALIZAÇÃO (PLACA - PROIBIDO ESTACIONAR).',
            classification: 'MÉDIA',
            points: 4,
            place: 'R. DR. MOACYR GONCALVES                           ',
            district: 'VITORIA',
            date: '2013-09-06T20:12:00-03:00',
            plate: 'MQH9400',
            warning: false
        } ] );
    }
}


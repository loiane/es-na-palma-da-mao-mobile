import 'angular';
import { CeturbStorage } from './ceturb-storage.service';
import { BusLine } from './models/index';
import { AuthenticationService } from '../../shared/authentication/index';

let expect = chai.expect;

describe( 'CeturbStorage', () => {

    let sandbox: Sinon.SinonSandbox;
    beforeEach(() => sandbox = sinon.sandbox.create() );
    afterEach(() => sandbox.restore() );

    let ceturbStorage: CeturbStorage;
    let $localStorage: any;
    let authenticationService: AuthenticationService;

    beforeEach(() => {
        $localStorage = {};
        authenticationService = <AuthenticationService><any>{
            user: {
                cfp: '12345678912',
                cnhNumero: '77777777777',
                cnhCedula: '88888888888'
            }
        };
        ceturbStorage = new CeturbStorage( $localStorage, authenticationService );

        $localStorage[ ceturbStorage.favoriteLinesKey ] = <BusLine[]>[
            { name: 'Vila velha', number: '678' },
            { name: 'St. Antônio', number: '400' }
        ];
    });


    describe( 'favoriteLinesKey', () => {
        it( 'should be composed using user\'s CPF', () => {
            expect( ceturbStorage.favoriteLinesKey ).to.be.equal( `user-${authenticationService.user.cpf}-lines` );
        });
    });

    describe( 'isFavoriteLine(line)', () => {
        it( 'should be true if line number matches some already storaged line', () => {
            expect( ceturbStorage.isFavoriteLine( <BusLine>{ name: 'Vila velha', number: '678' }) ).to.be.true;
            expect( ceturbStorage.isFavoriteLine( <BusLine>{ name: 'Vila velha', number: '555' }) ).to.be.false;
        });
    });

    describe( 'removeFromFavoriteLines(line)', () => {
        it( 'should remove line if line number matches any stored line', () => {
            let line = <BusLine>{ name: 'Vila velha', number: '678' };
            let favoriteLines = ceturbStorage.removeFromFavoriteLines( line );
            expect( favoriteLines ).to.not.contain( line );
        });

        it( 'should not remove line if line number does not match any stored line', () => {
            let line = <BusLine>{ name: 'Vila velha', number: '999' };
            let favoriteLines = ceturbStorage.removeFromFavoriteLines( line );
            expect( favoriteLines ).to.not.contain( line );
        });
    });


    describe( 'addToFavoriteLines(line)', () => {
        it( 'should add line to favorite lines', () => {
            let newLine = <BusLine>{ name: 'Vila velha', number: '777' };
            let favoriteLines = ceturbStorage.addToFavoriteLines( newLine );
            expect( favoriteLines ).to.contain( newLine );
        });
    });
});


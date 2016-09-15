export class Enviroment {
    public onIonicBeforeEnterEvent: any;
    public $scope: any;
    public $ionicHistory: any;
    public $ionicNativeTransitions: any;

    /**
     * 
     * 
     * @private
     * @static
     * @type {Settings}
     */
    private static instance: Enviroment | undefined;
    /**
     * Creates an instance of Singleton.
     * 
     */
    private constructor() {
        this.refresh();
    }

    /**
     * 
     * 
     * @private
     * 
     * @memberOf Enviroment
     */
    public refresh() {
        this.$scope = {
            $on: ( event, callback ) => {
                if ( event === '$ionicView.beforeEnter' ) {
                    this.onIonicBeforeEnterEvent = callback;
                }
            },
            $broadcast() {}
        };
        this.$ionicHistory = { nextViewOptions() { } };
        this.$ionicNativeTransitions = { stateGo() { } };
    }

    /**
     * 
     * 
     * @static
     * @returns
     */
    public static getInstance() {
        if ( !Enviroment.instance ) {
            Enviroment.instance = new Enviroment();
        }
        return Enviroment.instance;
    }
}
let environment = Enviroment.getInstance();
export { environment };
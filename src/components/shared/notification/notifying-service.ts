
export function notifyingService( $rootScope ) {
    return {
        subscribe: function ( scope, event, callback ) {
            let handler = $rootScope.$on( event, callback );
            scope.$on( '$destroy', handler );
        },

        notify: function ( event, data ) {
            $rootScope.$emit( event, data );
        }
    };
};

notifyingService.$inject = [ '$rootScope' ];

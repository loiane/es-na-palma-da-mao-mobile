import moment from 'moment';

const filter = ()=> {
    return ( input )=> {
        let date = moment( input );
        if ( date == null || !date.isValid() ) {
            return input;
        }

        return date.fromNow();
    }
};

export default filter;
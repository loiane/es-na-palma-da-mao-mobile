import moment from 'moment';

const fromNowFilter = () => {
    return ( input ) => {
        let date = moment( input );
        if ( date == null || !date.isValid() ) {
            return input;
        }

        return date.fromNow();
    };
};

export default fromNowFilter;

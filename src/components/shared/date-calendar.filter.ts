import moment from 'moment';

const calendarFilter = () => {
    return ( input ) => {
        let date = moment( input );
        if ( !date || !date.isValid() ) {
            return input;
        }

        return date.calendar();
    };
};

export default calendarFilter;

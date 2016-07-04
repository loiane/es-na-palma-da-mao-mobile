import moment from 'moment';

const calendarFilter = () => {
    return ( input ) => {
        let date = moment( input );
        if ( date == null || !date.isValid() ) {
            return input;
        }

        return date.calendar();
    };
};

export default calendarFilter;

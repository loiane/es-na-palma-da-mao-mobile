import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({ name: 'fromNow' })
export class FromNowPipe implements PipeTransform {

    transform( inputDate, startOfDay ): string {
        let date = moment( inputDate );
        if ( date == null || !date.isValid() ) {
            return inputDate;
        }
        if ( startOfDay ) {
            return date.from( moment().startOf( 'day' ) );
        }
        return date.fromNow();
    }
}

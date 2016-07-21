import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({ name: 'toNow' })
export class ToNowPipe implements PipeTransform {
    transform( inputDate ): string {
        let date = moment( inputDate );
        if ( date == null || !date.isValid() ) {
            return input;
        }

        return date.toNow();
    }
}

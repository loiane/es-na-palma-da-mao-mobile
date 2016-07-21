import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {

    private defaultLower: string[] = [ 'de', 'do', 'da', 'em', 'a', 'e', 'o' ];

    transform( input, formatAll: Boolean = true, separator: string = ' ' ): string {
       if ( !input ) {
            return input;
        }
     
        if ( formatAll ) {
            return input.split( separator )
                    .map( ( word: string ) => {
                            if ( this.defaultLower.indexOf( word.toLowerCase() ) >= 0 ) {
                                return word.toLowerCase();
                            }
                            return word.charAt( 0 ).toUpperCase() + word.slice( 1 ).toLowerCase();
                        } ).join( ' ' );
        } else {
            // Capitalize the first letter of a sentence
            let output = input.charAt( 0 ).toUpperCase() + input.slice( 1 ).toLowerCase();
            if ( separator === ' ' ) {
                return output;
            } else {
                return output.split( separator ).join( ' ' );
            }
        }
    }
}

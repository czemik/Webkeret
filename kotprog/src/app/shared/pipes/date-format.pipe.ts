import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
name: 'dateFormat',
pure: false
})
export class DateFormatPipe implements PipeTransform {

transform(value: string, ...args: unknown[]): string {
let month = +value-1
let array = ['Január', 'Február', 'Március', 'Árpilis', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'];
return array[month];
}

}

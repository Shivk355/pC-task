import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], value: string, section: string): any[] {
    if (!items) return [];
    if (!value) return items;
    if (value == '' || value == null) return [];

    if (section === 'userlist') {
      return items.filter(item =>
        (item.type ? item.type.toLowerCase().indexOf(value) : '') > -1 ||
        (item.companyName ? item.companyName.toLowerCase().indexOf(value) : '') > -1 ||
        (item.member ? item.member.toLowerCase().indexOf(value) : '') > -1 ||
        (item.lock ? item.lock.toLowerCase().indexOf(value) : '') > -1
      );
    } else {
      return items.filter(item =>
        (item.username ? item.username.toLowerCase().indexOf(value) : '') > -1 ||
        (item.date ? item.date.toLowerCase().indexOf(value) : '') > -1 ||
        (item.msg ? item.msg.toLowerCase().indexOf(value) : '') > -1
      );
    }
  }
}

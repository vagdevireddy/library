import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'filterArray'})
export class FilterArray implements PipeTransform {
  transform(array: any, searchText: any, onField: any): any {
    const arr = [];
    if (!searchText) { return array }
    array.filter(function (item) {
      if (item[onField].toLowerCase().includes(searchText.toLowerCase())) {
        arr.push(item);
      }
    });
    return arr;
  }
}


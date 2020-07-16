import { Component, EventEmitter, Input, Output, SimpleChanges, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-sc-typeahead',
  templateUrl: './sc-typeahead.component.html',
  styleUrls: ['./sc-typeahead.component.scss']
})
export class ScTypeaheadComponent implements OnChanges {

  @Input() listItems;
  @Output() sendItemSelected = new EventEmitter();
  item;
  listItemsFound;
  hasError = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.listItems.previousValue) {
      this.item = '';
      this.hasError = false;
    }
  }

  searchElement() {
    return (item$: Observable<string>) => item$.pipe(
      tap(() => this.listItemsFound = []),
      debounceTime(100),
      distinctUntilChanged(),
      map(target => target.length <= 1 ? [] : this.listItems.filter((item) => {
        let res;
        try {
         res =  item.name.search(new RegExp(this.item, 'gi')) >= 0;
        } catch (error) {
        }
        return res;
      }).slice(0, 10).map(res => {
        this.listItemsFound.push(res);
        return res.name;
      }))
    );
  }

  validateSelected(selectedItem) {
    let isValid;
    if (selectedItem) {
      isValid = this.listItems.filter(item => selectedItem === item.name);
    }
    try {
      selectedItem === '' || isValid.length > 0 ? this.hasError = false : this.hasError = true;
    } catch (error) {
    }
  }
}

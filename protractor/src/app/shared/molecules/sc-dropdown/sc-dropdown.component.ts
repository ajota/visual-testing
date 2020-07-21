import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-sc-dropdown',
  templateUrl: './sc-dropdown.component.html',
  styleUrls: ['./sc-dropdown.component.scss']
})
export class ScDropdownComponent implements OnInit {

  @Input() listDropdown: [];
  @Input() set targetItem( value ) {
    this.valueToSearch = value;
    this.searchItem( value );
  }

  @Input() chosenItem = '';
  @Output() chosenItemChange = new EventEmitter();

  valueToSearch = '';
  itemsFound = [];
  isSearching = false;
  isPicked = false;

  constructor() {}

  ngOnInit() {
  }

  searchItem( valueToSearch ) {
    if ( !this.isPicked ) {
      this.isSearching = valueToSearch.length >= 3 ? true : false;

      if (valueToSearch !== '' && valueToSearch.length >= 3) {
        this.itemsFound = this.listDropdown.filter((item: any) => {
          return item.name.search(new RegExp(valueToSearch, 'i')) >= 0;
        });
      }
    } else {
      this.isSearching = false;
      this.isPicked = false;
    }
  }
}

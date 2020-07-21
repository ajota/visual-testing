import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit, OnChanges {
  @Input() dateRules;
  @Output() eventSendDate = new EventEmitter();
  date = {};
  dateInit;
  dateEnd;
  disable = true;

  constructor() {}

  ngOnInit() {
    this.getDateRange();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dateRules.currentValue) {
      this.dateRules = changes.dateRules.currentValue;
      this.getDateRange();
    }
   }
  isEmpty() {
    this.disable = this.date === {} ? true : false;
  }

  submitDate() {
    this.eventSendDate.emit(this.date);
    this.date = {};
    this.disable = true;
  }

  getDateRange() {
    const init = Math.abs(this.dateRules.DateInit) * (1000 * 60 * 60 * 24);
    const end = Math.abs(this.dateRules.DateEnd) * (1000 * 60 * 60 * 24);
    const currentDate = new Date().getTime();
    const initCalendar = new Date(currentDate - init);
    const endCalendar = new Date(currentDate - end);
    this.dateInit = {
      year: initCalendar.getFullYear(),
      month: initCalendar.getMonth() + 1,
      day: initCalendar.getDate() + 1
    };
    this.dateEnd = {
      year: endCalendar.getFullYear(),
      month: endCalendar.getMonth() + 1,
      day: endCalendar.getDate()
    };
  }
}

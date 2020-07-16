import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-sc-select-credit',
  templateUrl: './sc-select-credit.component.html',
  styleUrls: ['./sc-select-credit.component.scss']
})
export class ScSelectCreditComponent implements OnInit {

  @Input() credit;
  @Output() creditToPay = new EventEmitter();
  selectedCredit;

  constructor() { }

  ngOnInit() {
  }

}

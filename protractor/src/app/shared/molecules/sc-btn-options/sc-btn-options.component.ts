import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sc-btn-options',
  templateUrl: './sc-btn-options.component.html',
  styleUrls: ['./sc-btn-options.component.scss']
})
export class ScBtnOptionsComponent implements OnInit {

  @Input() question;
  @Input() type;
  @Output() sendOption = new EventEmitter();
  nameQuestion;

  constructor() { }

  ngOnInit() {
    this.getQuestionName();
  }

  getQuestionName() {
    try {
      this.nameQuestion = this.question.name ? this.question.name : '';
    } catch (error) {
      error = '';
    }
  }
}

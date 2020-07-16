import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  typeQuestion,
  styleActionResponse,
  actionTypeQuestion,
  ownerMessage
} from 'src/app/shared/templates/chatbot/config-chatbot';
import { MapConfigLangPipe } from '../../pipes/map-config-lang.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sc-message',
  templateUrl: './sc-message.component.html',
  styleUrls: ['./sc-message.component.scss']
})
export class ScMessageComponent implements OnInit {

  @Input() name;
  @Input() msg: string;
  @Input() data;
  @Input() last;
  @Output() actionResponse = new EventEmitter();
  @Output() editResponse = new EventEmitter();
  @Output() selectedOption = new EventEmitter();

  styleActionResponse: string;
  btnStyles = styleActionResponse;
  ownerMsg: string;
  actionType: string;
  currentTime: string;
  emptyMessage = actionTypeQuestion.emptyValue;
  isEditable;
  isCommand = false;

  constructor(private mapConfigLang: MapConfigLangPipe, private datePipe: DatePipe) {}

  ngOnInit() {
    this.questionOrAnswer(this.data.typeQuestion);
    this.actionTypeQuestion(this.data.typeQuestion);
    this.typeMessage();
    this.isEditableQuestion();
    this.isCommandQuestion();
    this.updateCache();
  }

  questionOrAnswer(type: string) {
    if (type !== 'error') {
      const tempOwner = Object.values(typeQuestion).includes(type);
      this.ownerMsg = tempOwner ? ownerMessage.bot : ownerMessage.user;
    } else {
      this.ownerMsg = type;
    }

  }

  actionTypeQuestion(type) {
    this.actionType = type;
    switch (type) {
      case typeQuestion.text:
        this.styleActionResponse = styleActionResponse.none;
        break;
      case typeQuestion.emptyAnswer:
        this.styleActionResponse  = styleActionResponse.none;
        break;
      case typeQuestion.personalReference:
        this.styleActionResponse = styleActionResponse.referenceForm;
        break;
      case typeQuestion.familyReferece:
        this.styleActionResponse = styleActionResponse.referenceForm;
        break;
      case typeQuestion.calendar:
        this.styleActionResponse = styleActionResponse.calendar;
        break;
      case typeQuestion.fileAttachment:
        this.styleActionResponse = styleActionResponse.uploadFile;
        break;
      case typeQuestion.jobReference:
        this.styleActionResponse = styleActionResponse.referenceForm;
        break;
      case typeQuestion.call:
        this.styleActionResponse = styleActionResponse.call;
        break;
      case typeQuestion.fileImage:
        this.styleActionResponse = styleActionResponse.camera;
        break;
      case typeQuestion.location:
        this.styleActionResponse = styleActionResponse.location;
        break;
      case typeQuestion.shortList:
        this.styleActionResponse = styleActionResponse.shortList;
        break;
      default:
        this.styleActionResponse = styleActionResponse.none;
        break;
    }
  }

  typeMessage() {
    const message = this.data.typeQuestion;
    switch (message) {
      case actionTypeQuestion.reponseLocation:
        this.msg = this.formatLocation(this.msg);
        break;
      case typeQuestion.calendar:
        this.msg = this.formatDate(this.msg);
        break;
      case actionTypeQuestion.familyReferenceResponse:
        this.msg = this.formatFamilyReference(this.msg);
        break;
      case actionTypeQuestion.personalReferenceResponse:
        this.msg = this.formatPersonalReference(this.msg);
        break;
      case actionTypeQuestion.jobReferenceResponseFull || actionTypeQuestion.jobReferenceResponseSalary:
        this.msg = this.formatJobReference(this.msg);
        break;
      case actionTypeQuestion.jobReferenceResponseSalary:
        this.msg = this.formatJobReference(this.msg);
        break;
      default:
        this.msg = this.formatDate(this.msg);
        break;
    }
    return this.msg;
  }

  isURL(url: string) {
    const urlRegExp = /^(http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    const result = urlRegExp.test(url);
    return result;
  }

  formatLocation(message: string) {
    const tempMsg = message.replace( /([a-z]*:)/gi, '<b>$&</b>' ).replace(/([a-zá-ź]+:)?([a-zá-ź().\s]+)(?:\|)/gi, '$1 $2 <br/>');
    return `<b class="text-uppercase">${this.mapConfigLang.transform('lbl_title_location')}</b><br/>${tempMsg}`;
  }

  formatDate(message) {
    const dateRegExp = /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/;
    const isDate = dateRegExp.test(message);
    let tempDate;
    let date;

    if (isDate) {
      tempDate = Date.parse(message);
      try {
        date = this.datePipe.transform(tempDate, 'dd/MMMM/y');
      } catch (err) {
        date = message;
      }
    }
    return date || message;
  }

  formatFamilyReference(message: string) {
    const tempMsg = message.replace( /([a-zá-ź]*:)/gi, '<b>$& </b>' ).replace(/\|/g, '<br/>');
    const title = `<b>${this.mapConfigLang.transform('lbl_message_family_reference')}</b><br/>`;
    return `${title}${tempMsg}`;
  }

  formatPersonalReference(message: string) {
    const tempMsg = message.replace( /([a-zá-ź]*:)/gi, '<b>$& </b>' ).replace(/\|/g, '<br/>');
    const title = `<b>${this.mapConfigLang.transform('lbl_message_personal_reference')}</b><br/>`;
    return title + tempMsg;
  }

  formatJobReference(message: string) {
    const tempMsg = message.replace(/([a-zá-ź\s]*:)/gi, '<b>$& </b>').replace(/\|/g, '<br/>');
    const title = `<b>${this.mapConfigLang.transform('lbl_message_job_reference')}</b><br/>`;
    return `${title}${tempMsg}`;
  }


  updateCache() {
    const date = new Date().getTime();
    this.currentTime = `${date}`;
  }

  isEditableQuestion() {
    if (this.data.question) {
      this.isEditable = this.data.question.editable;
    } else {
      this.isEditable = false;
    }
  }

  isCommandQuestion() {
    try {
      this.isCommand = this.data.typeQuestion === typeQuestion.command ? true : false;
    } catch (error) {
    }
  }
}

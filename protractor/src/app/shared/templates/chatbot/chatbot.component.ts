import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatbotService } from './chatbot.service';
import { DataCustomerParams, DataRequestById } from './chatbot.model';
import { Message } from './chatbot.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import {
  typeQuestion,
  actionTypeQuestion,
  formatResponse
} from './config-chatbot';
import { isRegExp } from 'util';
import { Router } from '@angular/router';
import { MapConfigLangPipe } from '../../pipes/map-config-lang.pipe';
import { ScNotifyService } from '../../organism/sc-notify/sc-notify.service';
import { nameRoutes } from '../../util/name-routes';
import { LoginService } from '../../security/login.service';
import { TitleCasePipe } from '@angular/common';
import { MapConfigBasePipe } from '../../pipes/map-config-base.pipe';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {
  @ViewChild('modal', { static: true }) modal;
  @ViewChild('thread', { static: true }) thread: ElementRef;
  customerParams$: DataCustomerParams;
  paramsRequestById$: DataRequestById;
  paramsChatBot: any;
  chat$: Observable<Message[]>;
  lastMessage;
  responseMsg: string;
  requestStatus: number;
  typeQuestion = typeQuestion;
  actionType: string;
  typeLastMessage = '';
  isOptional = false;
  showErrorResponse = false;
  showCamera = false;
  enableInputResponse = false;
  inputChatRules;
  commandUpdate = '';
  listCities;

  constructor(
    private chatbotService: ChatbotService,
    public sanitizer: DomSanitizer,
    private router: Router,
    private mapConfigLang: MapConfigLangPipe,
    private notify: ScNotifyService,
    private loginService: LoginService,
    private titleCase: TitleCasePipe,
    private mapConfigBase: MapConfigBasePipe
  ) {}

  regWhiteSpace = new RegExp(this.mapConfigBase.transform('str_regular_expression_no_white_space'), 'gi');

  ngOnInit() {
    this.initialConfig();
    this.getCities();
  }

  initialConfig() {
    this.chatbotService.getCustomerParams().subscribe(res => {
      this.customerParams$ = res.data;
      this.chatbotService
        .getRequestByIdDocument(this.customerParams$)
        .subscribe(result => {
          this.paramsRequestById$ = result.data;

          this.paramsChatBot = {
            ...this.customerParams$,
            ...this.paramsRequestById$
          };
          this.getMessages(this.paramsChatBot);
        });
    });
  }

  getMessages(params) {
    const { _id } = params.request;

    this.chat$ = this.chatbotService.getFirebaseMessages(_id).pipe(
      map(message => {
        this.lastMessage = [...message];
        this.getResponseRules();
        this.isOptionalQuestion();
        this.disableSendResponse();
        this.getRequestStatus();
        this.scrollTo();
        return [...message];
      })
    );
  }

  sendResponse() {
    this.actionType = '';
    const tempMsg = Object.assign({}, ...this.lastMessage);
    this.getTypeResponse();
    if (this.responseMsg.length > 0) {
      if (this.validateResponse) {
        const msg = new Message();
        msg.storeId = tempMsg.storeId;
        msg.question = tempMsg.question;
        msg.typeQuestion = this.typeLastMessage || 'response';
        msg.type = tempMsg.type || '';
        if (this.commandUpdate) {
          msg.type = this.commandUpdate;
        }
        msg.message = this.formatResponse(this.responseMsg);
        msg.status = true;

        this.chatbotService.sendFirebaseMessage(msg);
      } else {
        this.responseMsg = '';
      }
      this.responseMsg = '';
      this.typeLastMessage = '';
      this.loginService.updateInteractionUserSession();
    }
  }

  getResponseRules(msg = null) {
    let tempLastMsg;
    let tempRules;
    let property = '';
    let value = '';
    this.inputChatRules = {};
    try {
      if (Object.keys(msg).length > 0) {
        tempLastMsg = Object.assign({}, msg);
      }
    } catch (error) {
      tempLastMsg = Object.assign({}, ...this.lastMessage);
    }
    const tempProperties = Object.assign({}, tempLastMsg.question.properties);
    const lengthProperties = Object.keys(tempProperties).length;
    const validators = Object.assign({}, tempLastMsg.question.validator);

    for (let i = 0; i <= lengthProperties; i++) {
      if (tempProperties[i]) {
        property = tempProperties[i].property;
        value = tempProperties[i].value;
        tempRules = { [property]: value };
      }
      this.inputChatRules = { ...this.inputChatRules, ...tempRules, ...validators};
    }
    tempLastMsg = {};
  }

  get validateResponse() {
    const tempRegEx = new RegExp(this.inputChatRules.expression);
    this.responseMsg = this.responseMsg.replace(/\s*$/, '');
    if (this.responseMsg.includes(typeQuestion.command) ) {
      return true;
    }
    if (this.responseMsg === actionTypeQuestion.emptyValue) {
      return true;
    }
    if (isRegExp(tempRegEx)) {
      this.showErrorResponse = tempRegEx.test(this.responseMsg) ? false : true ;
      return tempRegEx.test(this.responseMsg);
    }
  }

  formatResponse(message){
    switch (this.inputChatRules.case) {
      case formatResponse.capitalCase:
        if (message !== actionTypeQuestion.emptyValue) {
          this.responseMsg = this.titleCase.transform(message);
        }
        break;
      default:
        this.responseMsg = message;
        break;
    }
    return this.responseMsg;
  }

  showModalType(action: string) {
    this.actionType = action;
  }

  hideModalType() {
    this.actionType = '';
  }

  alertCameraError(error) {
    this.hideModalType();
    this.notify.open({
      title: this.mapConfigLang.transform('lbl_tittle_need_camera'),
      message: this.mapConfigLang.transform('lbl_need_camera'),
      icon: 'sc-icon--notify-camera',
      type: 'noCamera',
      subtitle: this.mapConfigLang.transform('lbl_tittle_download_app'),
      icon2: 'sc-icon--notify-noCamera',
      icon3: 'sc-icon--notify-playstore'
    });
  }

  sendPhoto(file: File) {
    const tempMsg = Object.assign({}, ...this.lastMessage);
    const questionName = tempMsg;
    const requestId = this.paramsChatBot.request._id;

    const body = new FormData();
    body.append('idChat', requestId);
    body.append('fieldName', questionName.question.name);
    body.append('file', file, file.name);

    this.chatbotService.postSavePhoto(body).subscribe(res => {
      this.responseMsg = res.data;
      this.sendResponse();
    });
  }

  getTypeResponse() {
    const tempMsg = Object.assign({}, ...this.lastMessage);
    switch (tempMsg.typeQuestion) {
      case typeQuestion.fileImage:
        this.typeLastMessage = actionTypeQuestion.responseWithPhoto;
        break;
      case typeQuestion.fileAttachment:
        this.typeLastMessage = actionTypeQuestion.responseWithFile;
        break;
      case typeQuestion.location:
        this.typeLastMessage = actionTypeQuestion.reponseLocation;
        break;
      case typeQuestion.familyReferece:
        this.typeLastMessage = actionTypeQuestion.familyReferenceResponse;
        break;
      case typeQuestion.personalReference:
        this.getCities();
        this.typeLastMessage = actionTypeQuestion.personalReferenceResponse;
        break;
      case typeQuestion.jobReference:
        this.getCities();
        this.typeLastMessage = actionTypeQuestion.jobReferenceResponseFull;
        break;
      case typeQuestion.command || typeQuestion.agentMsg:
        this.commandUpdate = 'update';
        break;
      case typeQuestion.calendar:
        this.getResponseRules();
        break;
      default:
        break;
    }
  }

  isOptionalQuestion() {
    const tempLastMsg = Object.assign({}, ...this.lastMessage);
    this.isOptional = tempLastMsg.question.optional;
  }

  disableSendResponse() {
    const tempMsg = Object.assign({}, ...this.lastMessage);
    if (tempMsg.typeQuestion === typeQuestion.text) {
      this.enableInputResponse = false;
    } else {
      this.enableInputResponse = true;
    }
  }

  formatDate(date) {
    const tempDate = `${date.year}-${date.month}-${date.day}`;
    return `${tempDate}`;
  }

  formatFamilyReference(form) {
    let msg = '';
    form.name = form.name.replace(this.regWhiteSpace, '');
    const { name, phone, relationship } = form;
    msg = `${this.mapConfigLang.transform(
      'lbl_message_relationship'
    )}:${relationship}|${this.mapConfigLang.transform('lbl_message_fullname')}:${this.titleCase.transform(name)}|${this.mapConfigLang.transform('lbl_message_phone')}:${phone}`;
    return msg;
  }

  formatJobReference(form) {
    let msg = '';
    form.business = form.business.replace(this.regWhiteSpace, '');
    const { ocupation, salary, business, phone, role } = form;
    if(form.ocupation == 'Empleado'){
      msg = `${this.mapConfigLang.transform(
        'lbl_message_ocupation'
      )}:${ocupation}|Ingresos:${salary}|${this.mapConfigLang.transform('lbl_message_phone')}:${phone ? phone : ''}|${this.mapConfigLang.transform('lbl_message_name_job')}:${business ? this.titleCase.transform(business) : ''}|${this.mapConfigLang.transform('lbl_message_position')}:${role ? role : ''}`;
    } else {
      msg = `${this.mapConfigLang.transform('lbl_message_ocupation')}:${ocupation}|Ingresos:${salary}`;
    }
    return msg;
  }

  skipQuestion() {
    this.typeLastMessage = actionTypeQuestion.emptyResponse;
    this.responseMsg = actionTypeQuestion.emptyValue;
    this.sendResponse();
  }

  resendQuestion(message) {
    this.showErrorResponse = false;
    if (message.question.editable) {
      this.getResponseRules(message);
      const { _id } = this.paramsChatBot.request;
      const name = this.validateResendQuestion(message.question);
      const { storeId } = message;
      const position = this.inputChatRules.position;
      if (position) {
        this.chatbotService
          .getResendQuestion(_id, name, storeId, position)
          .subscribe();
      } else {
        this.chatbotService.getResendQuestion(_id, name, storeId).subscribe();
      }
    }
  }

  validateResendQuestion(question) {
    let name = '';
    switch (question.name) {
      case 'personalRef':
        name = question.name;
        break;
      case 'laboralRef':
        name = question.name;
        break;
      default:
        name = question.name;
        break;
    }
    return name;
  }

  scrollTo() {
    setTimeout(() => {
      const currentHeight = this.thread.nativeElement.scrollHeight;
      this.thread.nativeElement.scrollTo(0, currentHeight);
    });
  }

  getRequestStatus() {
    const { storeId, _id } = this.paramsChatBot.request;
    this.chatbotService.getFirebaseStatus(storeId, _id).subscribe(res => {
      this.requestStatus = res;
      this.validateResponseStatus();
    });
  }

  validateResponseStatus() {
    if (this.requestStatus === 1) {
      setTimeout (() => {
        this.router.navigate([nameRoutes.dashboard]);
      }, 5000)
    }
    if (this.requestStatus === 4) {
      setTimeout (() => {
        this.router.navigate([nameRoutes.dashboard]);
      }, 5000)
    }
  }

  getCities() {
    this.chatbotService.getCities().subscribe(res => {
      this.listCities = res.data.locations;
    });
  }
}

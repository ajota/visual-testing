import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import {NgbTypeaheadModule, NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, NgbTypeaheadModule, NgbDatepickerModule],
  exports: [NgbTypeaheadModule, NgbDatepickerModule]
})
export class NgBootstrapModule {}

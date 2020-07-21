import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-validate-token',
  templateUrl: './validate-token.component.html',
  styleUrls: ['./validate-token.component.scss']
})
export class ValidateTokenComponent implements OnInit {

  typeValidation: Params;
  constructor(
    private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getTypeValidationParams();
  }

  getTypeValidationParams() {
    this.typeValidation = this.activeRoute.snapshot.params;
  }

}

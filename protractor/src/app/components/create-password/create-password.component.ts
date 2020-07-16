import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePassword } from 'src/app/shared/shared.model';
import { PassDataService } from 'src/app/shared/util/pass-data.service';
import { nameRoutes } from 'src/app/shared/util/name-routes';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.scss']
})
export class CreatePasswordComponent implements OnInit {

  params = this.route.snapshot.queryParams;

  constructor(
    private route: ActivatedRoute,
    private routing: Router,
    private passData: PassDataService
  ) {}

  ngOnInit() {}

  sendChangePassword( formData ) {
    const {password, verify_pass} = formData;
    const data: ChangePassword = { password, confirmPassword: verify_pass, paramToken: this.params.t };
    this.passData.setData( data );
    this.routing.navigate(['/' + nameRoutes.centersAutorization]);
  }

  get hasParams(): boolean {
    return (Object.keys(this.params).length === 1);
  }

}

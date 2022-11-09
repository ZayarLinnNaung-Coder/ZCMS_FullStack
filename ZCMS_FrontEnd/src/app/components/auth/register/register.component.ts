import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../../model/User";
import {AuthService} from "../../../service/auth.service";
import {NotifierService} from "../../../service/notifier.service";
import {UrlConstant} from "../../../const/UrlConstant";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerFormGroup!: FormGroup;

  UrlConstant = UrlConstant;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.registerFormGroup = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      username: [''],
      email: [''],
      password: [''],
      cPassword: ['']
    });
  }



  ngOnInit(): void {
  }

  onRegister(){
    const registerFormValue = this.registerFormGroup.value;
    const user = new User(
      null,
      registerFormValue.username,
      registerFormValue.password,
      registerFormValue.email,
      registerFormValue.firstName,
      registerFormValue.lastName
    );

    console.log(user)

    if(registerFormValue.password == registerFormValue.cPassword) {
      this.authService.registerUser(user).subscribe({
        next: () => {
          NotifierService.success("Registered Successfully")
        },
        error: err => {
          NotifierService.failure(err.error.message.toUpperCase())
        }
      });
    }
  }
}

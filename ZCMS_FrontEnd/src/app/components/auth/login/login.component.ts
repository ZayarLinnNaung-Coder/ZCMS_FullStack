import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../../service/auth.service";
import {UserLoginInfo} from "../../../model/UserLoginInfo";
import {NotifierService} from "../../../service/notifier.service";
import {UrlConstant} from "../../../const/UrlConstant";
import {SecurityConstant} from "../../../const/SecurityConstant";
import {Router} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {User} from "../../../model/User";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup!: FormGroup;
  UrlConstant = UrlConstant;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  onLogin() {
    const loginFormValue = this.loginFormGroup.value;
    const userLoginInfo = new UserLoginInfo(
      loginFormValue.username, loginFormValue.password
    );
    this.authService.login(userLoginInfo).subscribe({
      next: response => {
        this.authService.saveTokenToLocalStorage(response.headers.get(SecurityConstant.JWT_TOKEN));
        this.userService.findUserByUsername(loginFormValue.username).subscribe((user: User) => {
          this.authService.saveUserToLocalStorage(user);
        });

        NotifierService.success("Welcome");
        this.router.navigate([UrlConstant.CONTENT_MANAGER]);
      },
      error: () => {
        NotifierService.failure("Invalid Credentials");
      }
    })
  }
}

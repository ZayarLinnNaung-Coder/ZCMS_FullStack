import { Component, OnInit } from '@angular/core';
import {faImage} from "@fortawesome/free-regular-svg-icons/faImage";
import {faKaaba} from "@fortawesome/free-solid-svg-icons/faKaaba";
import {faStickyNote} from "@fortawesome/free-regular-svg-icons/faStickyNote";
import {faGear} from "@fortawesome/free-solid-svg-icons/faGear";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons/faChevronRight";
import {UrlConstant} from "../../const/UrlConstant";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {NotifierService} from "../../service/notifier.service";

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss']
})
export class SideNavbarComponent implements OnInit {

  notesIcon = faStickyNote;
  mediaIcon = faImage;
  kaabaIcon = faKaaba;
  settingIcon = faGear;
  leftArrowIcon = faChevronLeft;
  rightArrowIcon = faChevronRight;

  UrlConstant = UrlConstant;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigate([UrlConstant.USER_LOGIN]);
    NotifierService.success('Successfully logout');
  }
}

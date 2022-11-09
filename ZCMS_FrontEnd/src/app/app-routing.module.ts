import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContentManagerComponent} from "./components/content-manager/content-manager.component";
import {ContentTypeBuilderComponent} from "./components/content-type-builder/content-type-builder.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {AuthGuard} from "./guard/auth.guard";
import {UrlConstant} from "./const/UrlConstant";
import {MediaLibraryComponent} from "./components/media-library/media-library.component";

const routes: Routes = [
  {path: UrlConstant.USER_REGISTER, component: RegisterComponent},
  {path: UrlConstant.USER_LOGIN, component: LoginComponent},
  {path: UrlConstant.CONTENT_MANAGER, component: ContentManagerComponent, canActivate: [AuthGuard]},
  {path: UrlConstant.CONTENT_TYPE_BUILDER, component: ContentTypeBuilderComponent, canActivate: [AuthGuard]},
  {path: UrlConstant.MEDIA_LIBRARY, component: MediaLibraryComponent, canActivate: [AuthGuard]},
  {path: '', pathMatch: 'full', redirectTo: UrlConstant.CONTENT_MANAGER}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

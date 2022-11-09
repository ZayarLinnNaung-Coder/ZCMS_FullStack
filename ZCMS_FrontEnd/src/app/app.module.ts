import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { ContentManagerComponent } from './components/content-manager/content-manager.component';
import { ContentTypeBuilderComponent } from './components/content-type-builder/content-type-builder.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthInterceptor} from "./interceptor/auth.interceptor";
import { ContentTypeDetailsComponent } from './components/content-type-builder/content-type-details/content-type-details.component';
import { FieldChooserComponent } from './components/popup/field-chooser/field-chooser.component';
import { FieldDetailsComponent } from './components/popup/field-details/field-details.component';
import { NewContentTypeComponent } from './components/popup/new-content-type/new-content-type.component';
import { ContentEntryComponent } from './components/content-manager/content-entry/content-entry.component';
import { NewContentComponent } from './components/popup/new-content/new-content.component';
import {NgxSummernoteModule} from "ngx-summernote";
import { MediaLibraryComponent } from './components/media-library/media-library.component';
import { AddNewAssetsPopupComponent } from './components/popup/add-new-assets-popup/add-new-assets-popup.component';
import { MediaLibraryPopupComponent } from './components/popup/media-library-popup/media-library-popup.component';
import { NameSplitPipePipe } from './pipe/name-split-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SideNavbarComponent,
    ContentManagerComponent,
    ContentTypeBuilderComponent,
    RegisterComponent,
    LoginComponent,
    ContentTypeDetailsComponent,
    FieldChooserComponent,
    FieldDetailsComponent,
    NewContentTypeComponent,
    ContentEntryComponent,
    NewContentComponent,
    MediaLibraryComponent,
    AddNewAssetsPopupComponent,
    MediaLibraryPopupComponent,
    NameSplitPipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSummernoteModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import '../vendor.ts';
// import './typings.d.ts';

import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injector } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {AuthExpiredInterceptor} from "../blocks/interceptor/auth-expired.interceptor";
import {PaginationConfig} from "../blocks/config/uib-pagination.config";
import {AuthInterceptor} from "../blocks/interceptor/auth.interceptor";
import {UserRouteAccessService} from "../shared";
import {JhiEventManager} from "ng-jhipster";
import {ErrorHandlerInterceptor} from "../blocks/interceptor/errorhandler.interceptor";
import {NotificationInterceptor} from "../blocks/interceptor/notification.interceptor";
import {
    ProfileService
} from './@theme/profiles/profile.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpModule,
      AppRoutingModule,

      NgbModule.forRoot(),
      ThemeModule.forRoot(),
      CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
      {
          provide: APP_BASE_HREF, useValue: '/'
      },
      ProfileService,
      PaginationConfig,
      UserRouteAccessService,
      {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
          deps: [
              LocalStorageService,
              SessionStorageService
          ]
      },
      {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthExpiredInterceptor,
          multi: true,
          deps: [
              Injector
          ]
      },
      {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorHandlerInterceptor,
          multi: true,
          deps: [
              JhiEventManager
          ]
      },
      {
          provide: HTTP_INTERCEPTORS,
          useClass: NotificationInterceptor,
          multi: true,
          deps: [
              Injector
          ]
      }
  ],
})
export class AppModule {
}

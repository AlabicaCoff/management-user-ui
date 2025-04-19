import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { UsersDashboardComponent } from './features/dashboard/users-dashboard/users-dashboard.component';
import { UserProfileBarComponent } from './core/components/user-profile-bar/user-profile-bar.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AddUserComponent } from './features/user/add-user/add-user.component';
import { EditUserComponent } from './features/user/edit-user/edit-user.component';
import { DocumentListComponent } from './features/document/document-list/document-list.component';
import { UserListComponent } from './features/user/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UsersDashboardComponent,
    UserProfileBarComponent,
    AddUserComponent,
    EditUserComponent,
    LoginComponent,
    DocumentListComponent,
    UserListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

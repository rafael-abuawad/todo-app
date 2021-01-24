import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module';
import { ListsModule } from './lists/lists.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('access_token'),
        allowedDomains: ['localhost:3000'],
      },
    }),
    AppRoutingModule,
    AuthModule,
    ListsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { GunComponent } from './gun/gun.component';
import { VrDisplayComponent } from './vr-display/vr-display.component';
import { GroundhogTargetComponent } from './groundhog-target/groundhog-target.component';

@NgModule({
  declarations: [
    AppComponent,
    GunComponent,
    VrDisplayComponent,
    GroundhogTargetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

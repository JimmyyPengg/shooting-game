import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GunComponent } from './gun/gun.component';
import { VrDisplayComponent } from './vr-display/vr-display.component';

@NgModule({
  declarations: [
    AppComponent,
    GunComponent,
    VrDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

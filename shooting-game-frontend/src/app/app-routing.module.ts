import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VrDisplayComponent } from './vr-display/vr-display.component';
import { GunComponent } from './gun/gun.component';

const routes: Routes = [
  { path: 'vr-display', component: VrDisplayComponent },
  { path: 'gun', component: GunComponent },
  { path: '**', component: VrDisplayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

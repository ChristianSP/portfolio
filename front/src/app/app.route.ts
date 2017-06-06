import { Routes, RouterModule } from '@angular/router';
 
import { LandingPageComponent } from './landing-page/landing-page.component';


const appRoutes: Routes = [

    { path: '', component: LandingPageComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
 export const routing = RouterModule.forRoot(appRoutes);
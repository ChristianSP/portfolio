import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { IdiomasComponent } from './idiomas/idiomas.component';


import { TranslationClass} from './translate/translation';
import { TranslatePipe} from './translate/translation.pipe';
import { TranslateService} from './translate/translation.service';

import { routing } from './app.route';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    IdiomasComponent,
    TranslatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: "/"},
    {provide: TranslationClass.TRANSLATIONS, useValue: TranslationClass.dictionary},
    TranslateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

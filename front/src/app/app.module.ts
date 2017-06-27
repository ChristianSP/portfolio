import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { IdiomasComponent } from './idiomas/idiomas.component';

import { TextService } from './_services/text.service';
import { UrlService } from './_services/url.service';
import { GeneralService } from './_services/general.service';


import { TranslationClass} from './translate/translation';
import { TranslatePipe} from './translate/translation.pipe';
import { TranslateService} from './translate/translation.service';

import { routing } from './app.route';
import { RankingComponent } from './ranking/ranking.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ModalTextsComponent } from './modal-texts/modal-texts.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    IdiomasComponent,
    TranslatePipe,
    RankingComponent,
    CarouselComponent,
    ModalTextsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    BootstrapModalModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: "/"},
    {provide: TranslationClass.TRANSLATIONS, useValue: TranslationClass.dictionary},
    TranslateService,
    TextService,
    UrlService,
    GeneralService

  ],
  entryComponents: [
        ModalTextsComponent
      ],
  bootstrap: [AppComponent]
})
export class AppModule { }

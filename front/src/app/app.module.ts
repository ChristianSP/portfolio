import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { IdiomasComponent } from './idiomas/idiomas.component';

import { TextService } from './_services/text.service';
import { UrlService } from './_services/url.service';

import { TranslationClass} from './translate/translation';
import { TranslatePipe} from './translate/translation.pipe';
import { TranslateService} from './translate/translation.service';

import { routing } from './app.route';
import { RankingComponent } from './ranking/ranking.component';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    IdiomasComponent,
    TranslatePipe,
    RankingComponent,
    CarouselComponent
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
    TextService,
    UrlService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

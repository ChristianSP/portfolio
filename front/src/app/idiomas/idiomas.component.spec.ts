import { TestBed, async } from '@angular/core/testing';
import { IdiomasComponent } from './idiomas.component';

import { UrlService } from'../_services/url.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from '@angular/material';
import { TranslationClass} from '../translate/translation';
import { TranslatePipe} from '../translate/translation.pipe';
import { TranslateService} from '../translate/translation.service';
import { HomeComponent } from '../home/home.component';
import { GeneralService } from '../_services/general.service';

class RouterStub {
  url:String = "/";
  navigate(url: string) { return url; }
}

describe('IdiomasComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations:[ 
                    IdiomasComponent,
                    TranslatePipe,
                    HomeComponent
      ],
      providers: [
          { provide: Router,      useClass: RouterStub },
          {provide: TranslationClass.TRANSLATIONS, useValue: TranslationClass.dictionary},
          UrlService,
          TranslateService
      ],
      imports: [
        MaterialModule.forRoot(),
        RouterTestingModule
      ]


    });
    TestBed.compileComponents();
  });

  it('should create the IdiomasComponent', async(() => {
    const fixture = TestBed.createComponent(IdiomasComponent);
    fixture.detectChanges();
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));
});

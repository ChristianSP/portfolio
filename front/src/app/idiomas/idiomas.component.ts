import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../translate/index';

@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.scss']
})
export class IdiomasComponent implements OnInit {

    public supportedLangs: any[];

    constructor(private _translate: TranslateService) { }

    ngOnInit() {
        // standing data
        this.supportedLangs = [
          { display: 'es', value: 'es', cdgoBandera: "es" },
          { display: 'en', value: 'en', cdgoBandera: "gb" },
        ];

        // set current langage
        this.selectLang('es');
    }

    isCurrentLang(lang: string) {
        // check if the selected lang is current lang
        return lang === this._translate.currentLang;
    }

    selectLang(lang: string) {
        // set current lang;
        this._translate.use(lang);
    }
}

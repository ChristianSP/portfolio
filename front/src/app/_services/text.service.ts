import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { UrlService } from './url.service';

 
@Injectable()
export class TextService {
    
    constructor(
        private http: Http,
        private urlService: UrlService) {
    }
 
    getTexts(): Observable<String[]> {
        // get users from api
        return this.http.get(this.urlService.texts())
            .map((response: Response) => {
                return response.json().texts;
            });
    }

    addText(text: String): Observable<String[]> {
        // get users from api
        return this.http.post(this.urlService.text(),{text:text})
            .map((response: Response) => {
                return response.json().texts;
            });
    }

}


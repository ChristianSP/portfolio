import { Injectable } from '@angular/core';
 
@Injectable()
export class UrlService {
    private baseApiUrl = "http://piconapi.herokuapp.com"
    //private baseApiUrl = "http://localhost:3033"

    constructor() {
    }
    
    api(){
        return this.baseApiUrl;
    }

    text() {
        return this.baseApiUrl+"/text";
    }
    
    texts(){
        return this.baseApiUrl+"/texts";
    }

    
}
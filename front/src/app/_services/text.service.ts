import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { UrlService } from './url.service';

import * as io from 'socket.io-client';
 
@Injectable()
export class TextService {
    
    private socket: SocketIOClient.Socket;

    constructor(
        private http: Http,
        private urlService: UrlService) {
    }
 
    getTexts(): Observable<String[]> {
        // get users from api
        return this.http.get(this.urlService.texts())
            .map((response: Response) => {
                let data = response.json();
                for(let text of data.texts){
                    text.odds = text.count / data.totalCount;
                }
                return data;
            });
    }

    addText(text: String): Observable<String[]> {
        // get users from api
        return this.http.post(this.urlService.text(),{text:text})
            .map((response: Response) => {
                let data = response.json();
                for(let text of data.texts){
                    text.odds = text.count / data.totalCount;
                }
                return data;
            });
    }

    connectSocket() {
        let observable = new Observable(observer => {
            this.socket = io(this.urlService.api());

            this.socket.on('textAdded', (data) => {
                console.log("Somenone added a text")
                observer.next(data);    
            });
            

            return () => {
                this.socket.disconnect();
            };  
        })     
        return observable;
    }

    socketAddText(text){
        this.socket.emit('text was added',{text: text});
    }
}


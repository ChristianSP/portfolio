import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { GeneralService } from './_services/general.service';
import { DialogService } from "ng2-bootstrap-modal";
import { ModalTextsComponent } from "./modal-texts/modal-texts.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  subscription : Subscription;

  texts: Array<any>;

  showModal: Boolean = false;

  constructor(private generalService : GeneralService,private dialogService:DialogService){

  }

  ngOnInit(){
    this.subscription = this.generalService.notifyObservable$.subscribe((res) => {
        if(res.msg === "showModal"){
          this.texts = res.texts;
          this.showModal = true;

          let disposable = this.dialogService.addDialog(ModalTextsComponent, {texts: this.texts})
                .subscribe((isConfirmed)=>{});
        }
      });
  }
}

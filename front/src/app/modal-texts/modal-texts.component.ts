import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
export interface ConfirmModel {
  texts:Array<any>
}
@Component({
  selector: 'app-modal-texts',
  templateUrl: './modal-texts.component.html',
  styleUrls: ['./modal-texts.component.scss']
})
export class ModalTextsComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel,OnInit {

  texts:Array<any>

  sortingBy: string;

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit() {
  }


  confirm() {
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
    this.result = true;
    this.close();
  }

  sortBy(sortCondition: string){
    this.sortingBy = sortCondition;
    if(sortCondition === "alpha-asc"){
      this.texts.sort((elemento1,elemento2) => {
        if(elemento1.value > elemento2.value) return 1;
        if(elemento1.value < elemento2.value) return -1;
        return 0;
      });
    }
    if(sortCondition === "alpha-desc"){
      this.texts.sort((elemento1,elemento2) => {
        if(elemento1.value < elemento2.value) return 1;
        if(elemento1.value > elemento2.value) return -1;
        return 0;
      });
    }
    if(sortCondition === "num-asc"){
      this.texts.sort((elemento1,elemento2) => {
        if(elemento1.count > elemento2.count) return 1;
        if(elemento1.count < elemento2.count) return -1;
        return 0;
      });
    }
    if(sortCondition === "num-desc"){
      this.texts.sort((elemento1,elemento2) => {
        if(elemento1.count < elemento2.count) return 1;
        if(elemento1.count > elemento2.count) return -1;
        return 0;
      });
    }
  }

  isSortingBy(sortCondition: string){
    if(this.sortingBy === sortCondition){
      return true;
    }else{
      return false;
    }
  }
}

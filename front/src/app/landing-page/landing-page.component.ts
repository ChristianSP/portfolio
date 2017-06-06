import { Component, OnInit,ViewChild,ElementRef,AfterViewInit,HostListener } from '@angular/core';
import { textosBackground } from './backgroundTexts';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit,AfterViewInit{

  @ViewChild('textsWrapper')
  private textsWrapperRef: ElementRef;

  backgroundTexts:Array<any> = textosBackground;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    let textsWrapperElement = this.textsWrapperRef.nativeElement;
    this.backgroundTexts = [];
    textosBackground.forEach( (value,index) =>{
      let textObject = {
        text: null,
        x: null,
        y: null,
        vx: null,
        vy: null
      };
      textObject.text = value;
      textObject.x = this.getRandomInt(0,textsWrapperElement.clientWidth);
      textObject.y = this.getRandomInt(0,textsWrapperElement.clientHeight);
      textObject.vx = this.getRandomInt(-5,5);
      textObject.vy = this.getRandomInt(-5,5);
      this.backgroundTexts.push(textObject);
    });
    setInterval( () => this.tick() , 16);
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  onTextHover(event: MouseEvent,textoObject) {
      if(textoObject.vx >= 0){
        textoObject.vx += 30;
      }
      if(textoObject.vy >= 0){
        textoObject.vy += 30;
      }
      if(textoObject.vx < 0){
        textoObject.vx -= 30;
      }
      if(textoObject.vy < 0){
        textoObject.vy -= 30;
      }
      textoObject.vx = -textoObject.vx;
      textoObject.vy = -textoObject.vy;
  }

  tick(){
    let textsWrapperElement = this.textsWrapperRef.nativeElement;
    this.backgroundTexts.forEach( (textoObject,index) =>{
      textoObject.x += textoObject.vx;
      textoObject.y += textoObject.vy;
      if(textoObject.x < -100){
        textoObject.x = textsWrapperElement.clientWidth + 100;
      }
      if(textoObject.x > textsWrapperElement.clientWidth + 100){
        textoObject.x = -100;
      }
      if(textoObject.y < -50){
        textoObject.y = textsWrapperElement.clientHeight + 50;
      }
      if(textoObject.y > textsWrapperElement.clientHeight + 50){
        textoObject.y = -50;
      }
      if(textoObject.vx > 3){
        textoObject.vx--;
      }
      if(textoObject.vy > 3){
        textoObject.vy--;
      }
      if(textoObject.vx < -3){
        textoObject.vx++;
      }
      if(textoObject.vy < -3){
        textoObject.vy++;
      }
    });
  }

  isStd(textObject){
    if(Math.abs(textObject.vx) <= 5 && Math.abs(textObject.vy) <= 5){
      return true;
    }else{
      return false;
    }
  }

  isMed(textObject){
    if(Math.abs(textObject.vx) > 5 && Math.abs(textObject.vx) <= 20
    && Math.abs(textObject.vy) > 5 && Math.abs(textObject.vy) <= 20){
      return true;
    }else{
      return false;
    }
  }

  isHard(textObject){
    if(Math.abs(textObject.vx) > 20 && Math.abs(textObject.vy) > 20){
      return true;
    }else{
      return false;
    }
  }
}

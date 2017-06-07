import { Component, OnInit,ViewChild,ElementRef,AfterViewInit,HostListener } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { textosBackground } from './backgroundTexts';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit,AfterViewInit{

  @ViewChild('textsWrapper')
  private textsWrapperRef: ElementRef;

  private nShowedTexts: number = 5;
  private backgroundTexts:Array<any> = textosBackground;

  private bgTextInput:FormControl;

  constructor() {
    this.bgTextInput = new FormControl("",Validators.compose([Validators.minLength(2),Validators.maxLength(20),Validators.required]));
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    let textsWrapperElement = this.textsWrapperRef.nativeElement;
    this.backgroundTexts = [];
    for(let i=0;i<this.nShowedTexts;i++){
      let randomIndex = this.getRandomInt(0,textosBackground.length);
      let randomText = textosBackground[randomIndex];
      let textObject = {
        text: null,
        x: null,
        y: null,
        vx: null,
        vy: null
      };
      textObject.text = randomText;
      textObject.x = this.getRandomInt(0,textsWrapperElement.clientWidth);
      textObject.y = this.getRandomInt(0,textsWrapperElement.clientHeight);
      textObject.vx = this.getRandomInt(-5,5);
      textObject.vy = this.getRandomInt(-5,5);
      this.backgroundTexts.push(textObject);
    }
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
    let limiteExtra = 100;
    let velocidadMin = 3;
    this.backgroundTexts.forEach( (textoObject,index) =>{
      textoObject.x += textoObject.vx;
      textoObject.y += textoObject.vy;
      
      
      let superaLimite = false;
      if(textoObject.x < -limiteExtra){
        textoObject.x = textsWrapperElement.clientWidth + limiteExtra;
        superaLimite = true;
      }
      if(textoObject.x > textsWrapperElement.clientWidth + limiteExtra){
        textoObject.x = -limiteExtra;
        superaLimite = true;
      }
      if(textoObject.y < -limiteExtra){
        textoObject.y = textsWrapperElement.clientHeight + limiteExtra;
        superaLimite = true;
      }
      if(textoObject.y > textsWrapperElement.clientHeight + limiteExtra){
        textoObject.y = -limiteExtra;
        superaLimite = true;
      }
      //Cuando supere limites cambiar texto
      if(superaLimite){
        textoObject.text = this.getRandomText();
      }

      if(textoObject.vx > velocidadMin){
        textoObject.vx--;
      }
      if(textoObject.vy > velocidadMin){
        textoObject.vy--;
      }
      if(textoObject.vx < -velocidadMin){
        textoObject.vx++;
      }
      if(textoObject.vy < -velocidadMin){
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

  addText(){
    if(this.bgTextInput.valid){
      textosBackground.push(this.bgTextInput.value);

      let textsWrapperElement = this.textsWrapperRef.nativeElement;
      this.backgroundTexts = [];
      for(let i=0;i<this.nShowedTexts;i++){
        let randomIndex = this.getRandomInt(0,textosBackground.length);
        let randomText = textosBackground[randomIndex];
        let textObject = {
          text: null,
          x: null,
          y: null,
          vx: null,
          vy: null
        };
        if(i===0){
          textObject.text = this.bgTextInput.value;
        }else{
          textObject.text = randomText;
        }
        textObject.x = this.getRandomInt(0,textsWrapperElement.clientWidth);
        textObject.y = this.getRandomInt(0,textsWrapperElement.clientHeight);
        textObject.vx = this.getRandomInt(-5,5);
        textObject.vy = this.getRandomInt(-5,5);
        this.backgroundTexts.push(textObject);
      }

      this.bgTextInput.reset("");
    }
  }

  getRandomText(){
    let randomIndex = this.getRandomInt(0,textosBackground.length);
    let randomText = textosBackground[randomIndex];
    return randomText;
  }
}

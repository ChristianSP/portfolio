import { Component, OnInit,ViewChild,ElementRef,AfterViewInit,HostListener } from '@angular/core';
import { TextService } from '../_services/text.service';
import { FormControl, Validators } from '@angular/forms';
import { mockTexts } from './backgroundTexts';
import { mockProjects } from './projects';



@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit,AfterViewInit{

  @ViewChild('textsWrapper')
  private textsWrapperRef: ElementRef;

  private nShowedTexts: number = 5;
  private backgroundTexts:Array<any>  = mockTexts;
  private textosBackground:Array<any> ;
  
  private lastTexts: Array<any> = [];

  private bgTextInput:FormControl;

  private projects: Array<any> = mockProjects;

  constructor(private textService: TextService) {
    
    this.bgTextInput = new FormControl("",Validators.compose([Validators.minLength(2),Validators.maxLength(20),Validators.required]));
    this.textService.connectSocket().subscribe((data) => {
      if(data){
        this.lastTexts.push(data);
        this.textService.getTexts().subscribe((data:any) => {
          this.textosBackground = data.texts;
        });
      }
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.textService.getTexts().subscribe((data:any) => {
      this.prepairTextsBackground(data);
      setInterval( () => this.tick() , 16);
    })
  }

  @HostListener('document:keypress', ['$event'])
  onMouseMove(event: KeyboardEvent) {
    if(event.keyCode === 13){
      this.addText();
    }
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
        textoObject.text = this.getRandomTextByOdds().value;
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
      this.textService.addText(this.bgTextInput.value).subscribe((data) => {
        this.textService.socketAddText(this.bgTextInput.value);
        this.bgTextInput.reset("");
      });
    }
  }

  getRandomText(){
    let randomIndex = this.getRandomInt(0,this.textosBackground.length-1);
    let randomText = this.textosBackground[randomIndex];
    return randomText;
  }

  getRandomTextByOdds(){
    let randomIndex = this.getRandomInt(0,this.textosBackground.length-1);
    let randomText = this.textosBackground[randomIndex];
    let odds = Math.random();
    if(odds > randomText.odds){
      randomText = this.getRandomText();
    }
    return randomText;
  }

  prepairTextsBackground(data){
      this.textosBackground = data.texts

      let textsWrapperElement = this.textsWrapperRef.nativeElement;
      this.backgroundTexts = [];
      for(let i=0;i<this.nShowedTexts;i++){
        let randomText = this.getRandomTextByOdds();
        let textObject = {
          text: null,
          x: null,
          y: null,
          vx: null,
          vy: null,
          count: null,
          odds: null
        };
        textObject.text = randomText.value;
        textObject.count = randomText.count;
        textObject.odds = randomText.count / data.totalCount;
        textObject.x = this.getRandomInt(0,textsWrapperElement.clientWidth);
        textObject.y = this.getRandomInt(0,textsWrapperElement.clientHeight);
        textObject.vx = this.getRandomInt(-5,5);
        textObject.vy = this.getRandomInt(-5,5);
        this.backgroundTexts.push(textObject);
      }
  }

  getTopFive(){
    let ranking = 5;
    let rankingTexts =[];
    this.backgroundTexts.sort((elemento1,elemento2) => {
      if(elemento1.odds > elemento2.odds) return 1;
      if(elemento1.odds < elemento2.odds) return -1;
      return 0;
    });
    for(let i=0;i<ranking;i++){
      rankingTexts.push(this.backgroundTexts[i]);
    }
    return rankingTexts;
  }
}

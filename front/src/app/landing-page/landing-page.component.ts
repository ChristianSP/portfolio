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

  private particleColors: Array<string>= ["#8e261c","#cd6a49","#5f5e61"];

  private mediasFlag: any ={
    mobileLandscape: null,
    mobilePortrait: null,
    ipadLandscape: null,
    ipadPortrait: null,
    desktop: null
  }

  constructor(private textService: TextService) {

    if (matchMedia) {
      this.mediasFlag.mobilePortrait = window.matchMedia("(max-width: 480px)")
      this.mediasFlag.mobileLandscape = window.matchMedia("(min-width: 481px) and (max-width: 766px)")
      this.mediasFlag.ipadPortrait = window.matchMedia("(min-width: 767px) and (max-width: 991px)")
      this.mediasFlag.ipadLandscape = window.matchMedia("(min-width: 992px) and (max-width: 1199px)")
      this.mediasFlag.desktop = window.matchMedia("(min-width: 1200px)")
    }
    
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

  // @HostListener('document:keypress', ['$event'])
  // onMouseMove(event: KeyboardEvent) {
  //   if(event.keyCode === 13){
  //     this.addText();
  //   }
  // }

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
    let limiteExtra = this.mediasFlag.desktop.matches ? 100 : 10;
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

      //Cuando supere limites cambiar texto,velocidad y color
      if(superaLimite){
        textoObject.text = this.getRandomTextByOdds().value;
        textoObject.color = this.getRandomParticleColor();
        textoObject.vx = this.getRandomInt(-5,5);
        if(textoObject.vx === 0){
          textoObject.vx++;
        }
        textoObject.vy = this.getRandomInt(-5,5);
        if(textoObject.vy === 0){
          textoObject.vy++;
        }
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
          odds: null,
          color: null
        };
        textObject.text = randomText.value;
        textObject.count = randomText.count;
        textObject.odds = randomText.count / data.totalCount;
        textObject.x = this.getRandomInt(0,textsWrapperElement.clientWidth);
        textObject.y = this.getRandomInt(0,textsWrapperElement.clientHeight);
        textObject.vx = this.getRandomInt(-5,5);
        textObject.vy = this.getRandomInt(-5,5);
        textObject.color = this.getRandomParticleColor();
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

  getRandomParticleColor(){
    let randomIndex = this.getRandomInt(0,this.particleColors.length-1);
    return this.particleColors[randomIndex];
  }

  canShowLeftside(){
    if( this.mediasFlag.desktop.matches 
      || this.mediasFlag.ipadLandscape.matches
      || this.mediasFlag.ipadPortrait.matches ){
        return true;
    }else{
        return false;
    }
  }
  
  howManyTextsShowed(){
    return this.mediasFlag.ipadLandscape.matches ? 3 : 5;
  }
}

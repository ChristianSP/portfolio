import { Component, OnInit,Input,OnChanges } from '@angular/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit,OnChanges {

  @Input("texts")
  texts: Array<any>;
  @Input("key")
  key: string;
  @Input("ranking")
  ranking: number;

  rankingTexts:Array<any> = [];

  constructor() {
  }

  ngOnInit() {
    this.prepairRanking()
  }
  ngOnChanges() {
    this.prepairRanking()
  }

  prepairRanking(){
    if(this.texts){
      this.rankingTexts =[];
      this.texts.sort((elemento1,elemento2) => {
        if(elemento1[this.key] < elemento2[this.key]) return 1;
        if(elemento1[this.key] > elemento2[this.key]) return -1;
        return 0;
      });
      for(let i=0;i<this.ranking && i<this.texts.length;i++){
        this.rankingTexts.push(this.texts[i]);
      }
      return this.rankingTexts;
    }
    return []
  }
}

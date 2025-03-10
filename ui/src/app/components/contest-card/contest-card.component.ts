import { Component, OnInit ,Input, Output, EventEmitter } from '@angular/core';
import { Contest } from 'src/app/models/contest';

@Component({
  selector: 'app-contest-card',
  templateUrl: './contest-card.component.html',
  styleUrls: ['./contest-card.component.css']
})
export class ContestCardComponent implements OnInit {
  @Input() contest!:Contest;
  @Output() onSubscribe =new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  subscribe(){
    this.onSubscribe.emit(this.contest.id);
  }

}

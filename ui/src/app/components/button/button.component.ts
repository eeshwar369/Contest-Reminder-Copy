import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() text='Click Me!!!!';
  @Input() btnClass='btn-primary';

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    console.log("button clicked!!!")
  }

}

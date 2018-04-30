import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mycredit',
  templateUrl: './mycredit.component.html',
  styleUrls: ['./mycredit.component.css']
})
export class MycreditComponent implements OnInit {
  public rechargeAmounts = [];
  public rechargeAmount: number;
  constructor() { }

  ngOnInit() {
    this.rechargeAmounts = [200, 500, 700, 1000];
  }

}

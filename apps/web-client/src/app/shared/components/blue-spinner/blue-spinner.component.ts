import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'project-blue-spinner',
  templateUrl: './blue-spinner.component.html',
  styleUrls: ['./blue-spinner.component.scss'],
})
export class BlueSpinnerComponent implements OnInit {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  constructor() {}

  ngOnInit(): void {}
}

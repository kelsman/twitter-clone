import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'project-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() placeholder?: string;
  @Input() control?: FormControl;
  @Input() formControlName?: string

  constructor() { }

  ngOnInit(): void {
  }

}

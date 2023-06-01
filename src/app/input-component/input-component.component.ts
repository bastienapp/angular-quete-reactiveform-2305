import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-component',
  templateUrl: './input-component.component.html',
  styleUrls: ['./input-component.component.css']
})
export class InputComponentComponent implements OnInit {

  @Input()
  title: string = ''

  @Input()
  type: string = ''

  @Input()
  name: string = ''

  @Input()
  parentGroup!: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.parentGroup.addControl(this.name, new FormControl('', Validators.required))
  }
}

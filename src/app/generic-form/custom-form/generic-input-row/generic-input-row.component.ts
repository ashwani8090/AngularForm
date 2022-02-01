import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'generic-input-row',
  templateUrl: './generic-input-row.component.html',
  styleUrls: ['./generic-input-row.component.scss']
})
export class GenericInputRowComponent implements OnInit {
  @Input('field') field;
  @Input('formGroup') formGroup;
  constructor() { }

  ngOnInit(): void {
  }


}

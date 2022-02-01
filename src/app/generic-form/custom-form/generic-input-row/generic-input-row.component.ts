import { Component, Input, OnInit } from '@angular/core';
import { FormServiceService } from '../service/form-service.service';

@Component({
  selector: 'generic-input-row',
  templateUrl: './generic-input-row.component.html',
  styleUrls: ['./generic-input-row.component.scss'],
  providers: [FormServiceService]
})
export class GenericInputRowComponent implements OnInit {
  @Input('field') field;
  @Input('formGroup') formGroup;
  @Input('fieldData') fieldData;

  public drpData: any = [];

  constructor(
    private fs: FormServiceService
  ) {

  }

  ngOnChanges() {
    if (this.field['name']) {
      const fieldName = this.field['name'];
      this.drpData = this.fieldData[fieldName];
      console.log(this.drpData)
    }
  }

  ngOnInit(): void {
  }
}

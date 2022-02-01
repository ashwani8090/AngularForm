import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Validators } from '@angular/forms';
import { FormServiceService } from './generic-form/custom-form/service/form-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FormServiceService]
})
export class AppComponent {
  formData: any;
  fieldData: any;
  fields = [
    {
      type: 'control', name: 'category', label: 'Last Category', inputType: 'date', placeHolder: 'Last Category',
      validators: [Validators.required],
    },
    { type: 'control', name: 'id', label: 'Last ID', inputType: 'number', placeHolder: 'Last ID' },
    { type: 'control', name: 'associatedid', label: 'Construction Associated', inputType: 'text', placeHolder: 'Construction Associated' },
    {
      type: 'control', name: 'size', label: 'Size', inputType: 'text', placeHolder: 'Size',
    },
    {
      type: 'group', name: 'measurement', groupTitle: 'Last Measurements in (mm)',
      controls: [
        { name: 'firstName', label: 'First Name', inputType: 'text', placeHolder: 'First Name' },
        { name: 'lastname', label: 'Last Name', inputType: 'text' },
        { name: 'age', label: 'Age', inputType: 'text' },
        { name: 'gender', label: 'Gender', inputType: 'dropdown' },
        { name: 'state', label: 'State', inputType: 'dropdown' },
        { name: 'vendor', label: 'Vendor', inputType: 'dropdown' }
      ]
    },
  ]
  drpData = [{
    "name": "Alberta",
    "value": "AB"
  },
  {
    "name": "British Columbia",
    "value": "BC"
  },
  {
    "name": "Manitoba",
    "value": "MB"
  },
  {
    "name": "New Brunswick",
    "value": "NB"
  },
  {
    "name": "Newfoundland and Labrador",
    "value": "NL"
  },
  {
    "name": "Nova Scotia",
    "value": "NS"
  },
  {
    "name": "Northwest Territories",
    "value": "NT"
  },
  {
    "name": "Nunavut",
    "value": "NU"
  },
  {
    "name": "Ontario",
    "value": "ON"
  },
  {
    "name": "Prince Edward Island",
    "value": "PE"
  },
  {
    "name": "Quebec",
    "value": "QC"
  },
  {
    "name": "Saskatchewan",
    "value": "SK"
  },
  {
    "name": "Yukon",
    "value": "YT"
  }
  ]
  constructor(
    private fs: FormServiceService
  ) {
  }

  ngOnInit(): void {

    this.fs && this.fs.formDataSubmit.subscribe((data) => {
      this.formData = data;
    })
    this.fieldData = { gender: this.drpData, vendor: this.drpData, state: this.drpData }
  }

  handleSubmit: Subject<any> = new Subject();

  submit() {
    this.fs.submit();
  }
}

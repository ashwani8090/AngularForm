import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, FormArray, Validators, ValidatorFn, AbstractControl, NgForm, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  handleSubmit: Subject<any> = new Subject();
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
        { name: 'group', label: 'Group', inputType: 'text' },
        // { name: 'gender', label: 'Gender', inputType: 'dropdown' }
      ]
    },
  ]

  submit() {
    this.handleSubmit.next(true)
  }
}

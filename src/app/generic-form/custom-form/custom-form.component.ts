// refer to link for example
// https://stackblitz.com/edit/github-fjhr7s-5yeic7

import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  GenericHelper,
  GenericFormControl,
  GenericFormGroup,
  GenericFormType,
  AllValidationErrors,
  getFormValidationErrors,
  SchemaFormValidator
} from './interfaces';
import { FormServiceService } from './service/form-service.service';

@Component({
  selector: 'schema-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss']
})
export class CustomFormComponent implements OnInit {
  @Input('schema') fields: Array<GenericFormType> = [];
  @Input() isSubmitBtn: boolean = true;
  @Input() fieldData: any;

  public myForm: FormGroup;
  private changeSubscriptions: Array<Subscription> = [];

  constructor(
    private fb: FormBuilder,
    private fs: FormServiceService) {
  }

  ngOnInit() {
    this.fs.submitListener.subscribe(() => {
      this.onSubmit();
    })
    this.myForm = this.fb.group({});
    this.initFormFields();
  }

  ngOnDestroy() { this.changeSubscriptions.map(cs => cs.unsubscribe()); }

  onSubmit() {
    if (this.myForm.valid) {
      this.fs.formDataSubmit.next(this.myForm.value);
    } else {
      const error: AllValidationErrors = getFormValidationErrors(this.myForm.controls).shift();
      if (error) {
        let text;
        switch (error.error_name) {
          case 'required': text = `${error.control_name} is required!`; break;
          case 'pattern': text = `${error.control_name} has wrong pattern!`; break;
          case 'email': text = `${error.control_name} has wrong email format!`; break;
          case 'minlength': text = `${error.control_name} has wrong length! Required length: ${error.error_value.requiredLength}`; break;
          case 'maxlength': text = `${error.control_name} has wrong length! Required length: ${error.error_value.requiredLength}`; break;
          case 'areEqual': text = `${error.control_name} must be equal!`; break;
          default: text = `${error.control_name}: ${error.error_name}: ${error.error_value}`;
        }
        console.log(text)
      }
      return;
    }
  }

  private initFormFields() {
    for (let field of this.fields) {
      if (GenericHelper.isControl(field)) {
        this.myForm.addControl(field.name, this.initControl(field as GenericFormControl));
      }

      if (GenericHelper.isGroup(field)) {
        this.myForm.addControl(field.name, this.initGroup(field as GenericFormGroup));
      }
    }
  }


  private initControl(control: GenericFormControl): FormControl {
    return this.fb.control(control.value, this.addValidator(control.validators));
  }

  private initGroup(group: GenericFormGroup): FormGroup {
    let newFormGroup = this.fb.group({});
    for (let control of group.controls) {
      newFormGroup.addControl(control.name, new FormControl(control.value ? control.value : '', this.addValidator(control.validators)));
    }
    return newFormGroup;
  }

  private addValidator(validatorsObj: SchemaFormValidator) {
    let validatorarray = [];
    if (validatorsObj) {
      for (let validateKey in validatorsObj) {
        const schemaformValidatorValue = validatorsObj[validateKey];
        if (validateKey == 'required' && schemaformValidatorValue) {
          validatorarray.push(Validators.required)
        }
        if (validateKey == 'pattern') {
          validatorarray.push(Validators.pattern(schemaformValidatorValue))
        }
        if (validateKey == 'maxlength') {
          validatorarray.push(Validators.maxLength(schemaformValidatorValue))
        }
        if (validateKey == 'minlength') {
          validatorarray.push(Validators.minLength(schemaformValidatorValue))
        }
      }
    }
    return validatorarray;
  }

}


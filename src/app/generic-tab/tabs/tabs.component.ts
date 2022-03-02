import { Component, Input, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  GenericHelper,
  GenericFormControl,
  GenericFormGroup,
  GenericFormType,
  AllValidationErrors,
  getFormValidationErrors,
  SchemaFormValidator
} from '../interfaces';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  @Input('schema') fields: Array<any> = [];
  @Input() isSubmitBtn: boolean = true;
  @Input() fieldData: any;
  @Input() httpService: any;

  public myForm: FormGroup;
  private changeSubscriptions: Array<Subscription> = [];
  private errorSubject: Subject<any> = new Subject();

  constructor(
    private fb: FormBuilder,
    private fs: DataServiceService) {
  }

  ngOnInit() {
    // this.fs.submitListener.subscribe(() => {
    //   this.onSubmit();
    // })
    this.myForm = this.fb.group({ tabs: new FormArray([]) });
    this.initFormFields();
  }

  ngOnDestroy() { this.changeSubscriptions.map(cs => cs.unsubscribe()); }

  onSubmit() {
    if (this.myForm.valid) {
      this.errorSubject.next({ isValid: true })
      // this.fs.formDataSubmit.next(this.myForm.value);
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
        this.errorSubject.next({ name: error.control_name, erromessage: text, isValid: false })
      }
      return;
    }
  }

  private initFormFields() {
    console.log(this.fields)
    let tabs = this.fb.group({
    });
    for (const field of this.fields) {
      if (GenericHelper.isGroup(field)) {
        tabs.addControl(field.tablekey, this.initGroup(field as GenericFormGroup));
      }
      const tabsItems = this.myForm.get('tabs') as FormArray;
      tabsItems.push(tabs);
    }
    console.log(this.myForm)
  }


  private initGroup(group): FormGroup {
    let newFormGroup = this.fb.group({
      columns: new FormArray([]),
      rows: new FormArray([])
    });
    const columns = newFormGroup.get('columns') as FormArray;
    columns.push(this.addCtrl(group.controls.columns))
    // newFormGroup.addControl('columns',))
    
    return newFormGroup;
  }

  addCtrl(controls){
    let newFormGroup = this.fb.group({    });
    for (let control of controls) {
      newFormGroup.addControl(control.tablekey, new FormControl(control.value ? control.value : '', this.addValidator(control.validators)));
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

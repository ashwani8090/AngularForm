import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormServiceService } from '../service/form-service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GenericFormControl, Dropdown } from '../interfaces'


@Component({
  selector: 'generic-input-row',
  templateUrl: './generic-input-row.component.html',
  styleUrls: ['./generic-input-row.component.scss'],
  providers: [FormServiceService]
})
export class GenericInputRowComponent implements OnInit {
  @Input('field') field;
  @Input('formGroup') formGroup: FormControl;
  @Input('fieldData') fieldData;
  @Input() error: Subject<any> = new Subject();

  public drpData: Array<Dropdown> = [{ value: null, name: 'No data available' }];
  public filteredData: Array<Dropdown> = [{ value: null, name: 'No data available' }];
  public searchCtrl: FormControl = new FormControl();
  private _onDestroy = new Subject<void>();
  private errorMsg: string = null

  constructor(
    private fs: FormServiceService
  ) {

  }

  ngOnChanges() {
    /* set dropdown value */
    if (this.field.inputType === 'dropdown') {
      //check  fieldData  
      if (this.fieldData && this.field['name'] && this.fieldData[this.field['name']]) {
        const fieldName = this.field['name'];
        this.drpData = this.fieldData[fieldName];
        this.filteredData = this.drpData;
      }
      //check field hase endpoint then fetch
      else if (this.field.hasEndpoint) {

      }
      //check field has noendpoint then get data from schema
      else if (this.field.options) {
        this.drpData = this.field.options;
        this.filteredData = this.drpData;
      }
    }
  }

  ngOnInit(): void {
    //set error 
    this.error && this.error.subscribe((e) => {
      if (e.isValid) {
        this.errorMsg = '';
      } else {
        if (e.name == this.field['name']) {
          this.errorMsg = e.erromessage;
        }
      }
    })
    //seaching
    this.searchCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });
    //remove error on text change  
    this.formGroup.get(this.field['name']).valueChanges.subscribe(() => {
      this.errorMsg = "";
    })

  }


  filterBanks() {
    if (!this.drpData) {
      return;
    }
    // get the search keyword
    let search = this.searchCtrl.value;
    if (!search) {
      this.filteredData = this.drpData.slice()
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks

    this.filteredData = this.drpData.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)

  }
}

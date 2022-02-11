import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Dropdown, SchemFormFieldData } from '../interfaces';
/*add service for fetching api */
// import { HttpServiceV2 } from '../../../utils/service/http.service.v2';

@Component({
  selector: 'generic-input-row',
  templateUrl: './generic-input-row.component.html',
  styleUrls: ['./generic-input-row.component.scss'],
  // providers: [HttpServiceV2]
})
export class GenericInputRowComponent implements OnInit {
  @Input('field') field;
  @Input('formGroup') formGroup: FormControl;
  @Input('fieldData') fieldData;
  @Input() error: Subject<any> = new Subject();

  public drpData: Array<Dropdown> = [
    { value: null, name: 'No data available' },
  ];
  public filteredData: Array<Dropdown> = [
    { value: null, name: 'No data available' },
  ];
  public searchCtrl: FormControl = new FormControl();
  private _onDestroy = new Subject<void>();
  public errorMsg: string = null;

  constructor() {}
  // private httpService: HttpServiceV2

  ngOnChanges() {
    /* set dropdown value */
    if (this.field.inputType === 'dropdown') {
      const fieldName = this.field['name'];
      const schemaFieldData: SchemFormFieldData =
        this.fieldData && this.fieldData[fieldName];
      //check field hase endpoint then fetch
      if (this.field.hasEndpoint && this.field.endpoint) {
        this.fetchData(
          this.field.endpoint,
          this.field.payload,
          schemaFieldData.apiResManipulator
        );
      }
      //check field has noendpoint then get data from schema
      else if (!this.field.hasEndpoint && this.field.options) {
        this.drpData = this.field.options;
        this.filteredData = this.drpData;
      }
      //check  fieldData
      else if (
        this.fieldData &&
        this.field['name'] &&
        this.fieldData[this.field['name']]
      ) {
        this.drpData = schemaFieldData.options;
        this.filteredData = this.drpData;
      }
    }
  }

  ngOnInit(): void {
    //set error
    this.error &&
      this.error.subscribe((e) => {
        if (e.isValid) {
          this.errorMsg = '';
        } else {
          if (e.name == this.field['name']) {
            this.errorMsg = e.erromessage;
          }
        }
      });
    //seaching
    this.searchCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData();
      });
    //remove error on text change
    this.formGroup.get(this.field['name']).valueChanges.subscribe(() => {
      this.errorMsg = '';
    });
  }

  filterData() {
    if (!this.drpData) {
      return;
    }
    // get the search keyword
    let search = this.searchCtrl.value;
    if (!search) {
      this.filteredData = this.drpData.slice();
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredData = this.drpData.filter(
      (data) => data.name && data.name.toLowerCase().indexOf(search) > -1
    );
  }

  fetchData(endpoint, payload, filter) {
    /******* add your fetch logic here
      this.httpService.getRequest(endpoint, payload).
      subscribe((response) => {
        this.drpData = response;
        if (filter) {
          this.drpData = response.map(filter);
        }
        this.filteredData = this.drpData;
      })
      ********/
  }
}

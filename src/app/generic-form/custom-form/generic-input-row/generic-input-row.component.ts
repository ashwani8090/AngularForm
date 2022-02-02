import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormServiceService } from '../service/form-service.service';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject, Subject } from 'rxjs';


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
  public filteredData: any = []
  public searchCtrl: FormControl = new FormControl();
  private _onDestroy = new Subject<void>();

  constructor(
    private fs: FormServiceService
  ) {

  }

  ngOnChanges() {
    if (this.field['name']) {
      const fieldName = this.field['name'];
      this.drpData = this.fieldData[fieldName];
      this.filteredData = this.drpData;
    }
  }

  ngOnInit(): void {
    this.searchCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });
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

  // filterBanksMulti() {
  //   if (!this.drpData) {
  //     return;
  //   }
  //   // get the search keyword
  //   let search = this.bankMultiFilterCtrl.value;
  //   if (!search) {
  //     this.filteredBanksMulti.next(this.drpData.slice());
  //     return;
  //   } else {
  //     search = search.toLowerCase();
  //   }
  //   // filter the banks
  //   this.filteredBanksMulti.next(
  //     this.drpData.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
  //   );
  // }

}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormServiceService {
  public formDataSubmit: Subject<any> = new Subject<any>();
  public submitListener: Subject<any> = new Subject<any>();
  public fieldDataListener = new BehaviorSubject({});
  public dirty: boolean = false;

  constructor() {}

  //call submit to get data to parent
  submit() {
    this.submitListener.next(true);
  }

  formDirty(value: any) {
    this.dirty = value;
  }
}

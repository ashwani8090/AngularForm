import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {
  public formDataSubmit: Subject<any> = new Subject<any>();
  public submitListener: Subject<any> = new Subject<any>();
  
  constructor() { }

  //call submit to get data to parent
  submit(){
    this.submitListener.next(true);
  }

}

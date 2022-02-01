import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericDropdownComponent } from './custom-form/generic-dropdown/generic-dropdown.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormComponent } from './custom-form/custom-form.component';
import { GenericInputRowComponent } from './custom-form/generic-input-row/generic-input-row.component';
import { MatSelectModule } from '@angular/material/select';
import { FormServiceService } from './custom-form/service/form-service.service'

@NgModule({
  declarations: [
    CustomFormComponent,
    GenericInputRowComponent,
    GenericDropdownComponent,
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [CustomFormComponent],
  providers:[FormServiceService]
})
export class GenericFormModule { }

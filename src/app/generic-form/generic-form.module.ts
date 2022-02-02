import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormComponent } from './custom-form/custom-form.component';
import { GenericInputRowComponent } from './custom-form/generic-input-row/generic-input-row.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormServiceService } from './custom-form/service/form-service.service';
import { MatSelectSearchComponent } from './custom-form/mat-select-search/mat-select-search.component';

@NgModule({
  declarations: [
    CustomFormComponent,
    GenericInputRowComponent,
    MatSelectSearchComponent,
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  exports: [CustomFormComponent],
  providers: [FormServiceService],
})
export class GenericFormModule {}

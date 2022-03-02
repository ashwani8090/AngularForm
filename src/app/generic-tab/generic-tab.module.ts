import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs/tabs.component';
import { TableComponent } from './table/table.component';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TabsComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[TabsComponent]
})
export class GenericTabModule { }

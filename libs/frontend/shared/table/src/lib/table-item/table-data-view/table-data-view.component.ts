import { Component, ComponentRef, Input, OnInit, ViewChild } from '@angular/core';

import { ColumnTableConfiguration } from '../../table/table.model';
import { TableItemDirective } from '../table-item.directive';
import { TableTextComponent } from '../../table-text/table-text.component';

@Component({
  selector: 'stud-asso-table-data-view',
  templateUrl: './table-data-view.component.html',
})
export class TableDataViewComponent implements OnInit {
  @ViewChild(TableItemDirective, { static: true }) tableDirective!: TableItemDirective;

  @Input() columnConfiguration: ColumnTableConfiguration;
  @Input() data: any;

  ngOnInit() {
    this.renderData();
  }

  renderData() {
    if (this.columnConfiguration) {
      const compRef = this.createComponent();
      this.setDataToComponent(compRef);
    }
  }

  createComponent(): ComponentRef<TableTextComponent> {
    if (this.columnConfiguration.dataViewComponent) {
      return this.tableDirective.viewContainerRef.createComponent(this.columnConfiguration.dataViewComponent);
    } else {
      return this.tableDirective.viewContainerRef.createComponent(TableTextComponent);
    }
  }

  setDataToComponent(compRef: ComponentRef<TableTextComponent>) {
    if (this.columnConfiguration.dataProperty) {
      compRef.instance.setData(this.data[this.columnConfiguration.dataProperty]);
    } else {
      compRef.instance.setData(this.data);
    }
  }
}

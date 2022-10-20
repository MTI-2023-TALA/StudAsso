import { Component, OnInit } from '@angular/core';

import { ApiStockService } from '@stud-asso/frontend-core-api';
import { StockLogWithUserDto } from '@stud-asso/shared/dtos';

@Component({
  selector: 'stud-asso-stock-logs',
  templateUrl: './stock-logs.component.html',
  styleUrls: ['./stock-logs.component.scss'],
})
export class StockLogsComponent implements OnInit {
  logs: StockLogWithUserDto[];

  constructor(private api: ApiStockService) {}

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.api.findAllAssoStockLog().subscribe((logs: StockLogWithUserDto[]) => {
      this.logs = logs;
    });
  }
}

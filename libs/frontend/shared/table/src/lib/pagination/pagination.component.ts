import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PAGINATION_BASE_LIMIT } from '@stud-asso/shared/dtos';
import { Pagination } from '../table/table.model';

export interface PaginationUI {
  pageNumber: number;
  isCurrentPage: boolean;
}

@Component({
  selector: 'stud-asso-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Output() pagination = new EventEmitter<Pagination>();
  @Input() currentPagination: Pagination;

  paginationAvailablePages: PaginationUI[] = [];
  currentPage = 1;
  maxPage = 10;
  minPage = 1;

  ngOnInit(): void {
    this.currentPage = Math.floor(this.currentPagination.offset / PAGINATION_BASE_LIMIT) + 1;
    this.paginationAvailablePages = this._generateNewUiPagination(this.currentPage);
  }

  onClickPage(pageNumber: number) {
    if (this.currentPage === pageNumber) return;
    if (pageNumber < this.minPage || pageNumber > this.maxPage) return;
    this.currentPage = pageNumber;
    this.paginationAvailablePages = this._generateNewUiPagination(pageNumber);
    this.pagination.emit({
      offset: (pageNumber - 1) * 25,
      limit: 25,
    });
  }

  private _generateNewUiPagination(page: number): PaginationUI[] {
    const result: PaginationUI[] = [];

    // Corner case: First page and Last page
    let nextPageNumber = 1;
    let previousPageNumber = 1;
    if (page === this.minPage) {
      nextPageNumber = 2;
      previousPageNumber = 0;
    } else if (page === this.maxPage) {
      nextPageNumber = 0;
      previousPageNumber = 2;
    }

    result.push({
      pageNumber: page,
      isCurrentPage: true,
    });

    for (let i = previousPageNumber; i > 0; i--) {
      result.unshift({
        pageNumber: page - i,
        isCurrentPage: false,
      });
    }

    for (let i = 1; i <= nextPageNumber; i++) {
      result.push({
        pageNumber: page + i,
        isCurrentPage: false,
      });
    }

    return result;
  }
}

import {
  FirestoreService,
  Portfolio,
  PortfolioService,
} from '@ease-angular/services';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ColumnDef,
  LobbySubPageLayoutComponent,
  PortfolioCardComponent,
  SvgIconComponent,
  TableCdkComponent,
} from '@ease-angular/ui';
import { RouterModule } from '@angular/router';
import { dateToYYYYMMDD } from '@ease/utils';

@Component({
  selector: 'app-list-portfolio-page',
  imports: [
    PortfolioCardComponent,
    CommonModule,
    LobbySubPageLayoutComponent,
    RouterModule,
    SvgIconComponent,
    TableCdkComponent,
  ],
  standalone: true,
  templateUrl: './list-portfolio-page.component.html',
  styleUrl: './list-portfolio-page.component.css',
})
export class ListPortfolioPageComponent implements OnInit {
  private portfolioService = inject(PortfolioService);
  testArray = Array(5);

  portfolios: Portfolio[] = [];

  async ngOnInit() {
    this.portfolios = await this.getPortfolios();
  }

  async getPortfolios(): Promise<Portfolio[]> {
    try {
      const response = await this.portfolioService.getAllPortfolios();
      return response as Portfolio[];
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      return [];
    }
  }

  updatePortfolio(portfolio: Portfolio) {
    this.portfolios = this.portfolios.filter((p) => p.id != portfolio.id);
  }

  portfolioColumns: ColumnDef<Portfolio>[] = [
    {
      columnDef: 'givenName',
      header: 'First Name',
      cell: (row) => row.givenName,
    },
    {
      columnDef: 'familyName',
      header: 'Last Name',
      cell: (row) => row.familyName,
    },
    {
      columnDef: 'portfolioName',
      header: 'Portfolio',
      cell: (row) => row.portfolioName,
    },
    {
      columnDef: 'positionTitle',
      header: 'Title',
      cell: (row) => row.positionTitle,
    },
    {
      columnDef: 'createdOn',
      header: 'Created',
      cell: (row) => dateToYYYYMMDD(row.createdOn),
    },
    { columnDef: 'id', header: 'ID', cell: (row) => row.id },
  ];
}

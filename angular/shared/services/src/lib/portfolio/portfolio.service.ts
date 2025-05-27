import { Injectable } from '@angular/core';
import { FirestoreService } from '../firestore/firestore.service';

export interface Portfolio {
  givenName: string;
  familyName: string;
  portfolioName: string;
  positionTitle: string;
  createdOn: Date;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class PortfolioService extends FirestoreService {
  collectionName = 'portfolios';

  constructor() {
    super();
  }

  async createPortfolio(portfolio: Partial<Portfolio>) {
    return await this.create(portfolio, this.collectionName);
  }

  async getAllPortfolios(): Promise<Portfolio[]> {
    return (await this.readAll(this.collectionName)) as Portfolio[];
  }

  async deletePortfolio(portfolioId: string) {
    return await this.delete(this.collectionName, portfolioId);
  }
}

import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, inject, input, output, viewChild } from '@angular/core';
import {
  FirestoreService,
  Portfolio,
  PortfolioService,
} from '@ease-angular/services';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import {
  MenuItem,
  MenuOverlayComponent,
} from '../menu-overlay/menu-overlay.component';
import { Router } from '@angular/router';

@Component({
  selector: 'portfolio-card',
  imports: [CommonModule, SvgIconComponent, MenuOverlayComponent],
  templateUrl: './portfolio-card.component.html',
  styleUrl: './portfolio-card.component.css',
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ opacity: 0, transform: 'scale(0.95)' })
        ),
      ]),
    ]),
  ],
})
export class PortfolioCardComponent {
  private portfolioService = inject(PortfolioService);
  private router = inject(Router);

  menuOverlay = viewChild<MenuOverlayComponent>('menuOverlay');
  portfolio = input.required<Portfolio>();
  deletedPortfolioEvent = output<Portfolio>();

  menuItems: MenuItem[] = [
    {
      label: 'delete',
      action: this.deletePortfolio.bind(this),
      icon: 'delete',
    },
    {
      label: 'edit',
      icon: 'edit',
      action: this.editPortfolio.bind(this),
    },
  ];

  editPortfolio() {
    // Logic to edit the portfolio
    console.log('Edit portfolio:', this.portfolio().id);
    this.router.navigate(['/lobby/portfolios/edit', this.portfolio().id]);
    this.menuOverlay()?.closeMenu();
  }

  async deletePortfolio() {
    await this.portfolioService.deletePortfolio(this.portfolio().id);
    this.deletedPortfolioEvent.emit(this.portfolio());
    this.menuOverlay()?.closeMenu();
  }
}

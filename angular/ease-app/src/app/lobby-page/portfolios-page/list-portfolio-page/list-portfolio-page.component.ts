import { Component } from '@angular/core';
import { PortfolioCardComponent } from '../../portfolio-card/portfolio-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-portfolio-page',
  imports: [PortfolioCardComponent, CommonModule],
  standalone: true,
  templateUrl: './list-portfolio-page.component.html',
  styleUrl: './list-portfolio-page.component.css',
})
export class ListPortfolioPageComponent {
  testArray = Array(5);
}

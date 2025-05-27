import { CommonModule } from '@angular/common';
import { Component, input, computed } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';

export interface ColumnDef<T> {
  columnDef: string;
  header: string;
  cell: (element: T) => string;
}

@Component({
  selector: 'table-cdk',
  standalone: true,
  imports: [CommonModule, CdkTableModule],
  templateUrl: './table-cdk.component.html',
  styleUrl: './table-cdk.component.css',
})
export class TableCdkComponent<T> {
  dataSource = input.required<T[]>();
  columns = input.required<ColumnDef<T>[]>();

  displayedColumns = computed(() => {
    return this.columns().map((c) => c.columnDef);
  });
}

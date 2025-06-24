import { CommonModule } from '@angular/common';
import { Component, input, computed, signal, output } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { Intake } from '@ease-angular/services';

export interface ColumnDef<T> {
  columnDef: string;
  header: string;
  cell: (element: T) => string;
  sort?: boolean;
}

type SortDirection = 'asc' | 'desc' | '';

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
  isPaginator = input<boolean>(false);
  paginatorRows = input<number>(10);

  clickEvent = output<T>();

  pageIndex = signal(0);

  sortColumn = signal<string | null>(null);
  sortDirection = signal<SortDirection>(''); // '', 'asc', 'desc'

  pageSize = computed(() => this.paginatorRows());

  displayedColumns = computed(() => this.columns().map((c) => c.columnDef));

  // Sorting logic
  sortedData = computed(() => {
    const data = [...(this.dataSource() ?? [])];
    const column = this.sortColumn();
    const dir = this.sortDirection();

    if (!column || dir === '') return data;

    const columnDef = this.columns().find((c) => c.columnDef === column);
    if (!columnDef) return data;

    return data.sort((a, b) => {
      const valA = columnDef.cell(a);
      const valB = columnDef.cell(b);
      return dir === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });
  });

  pagedData = computed(() => {
    const data = this.sortedData();
    const start = this.pageIndex() * this.pageSize();
    return data.slice(start, start + this.pageSize());
  });

  totalPages = computed(() =>
    Math.ceil((this.sortedData()?.length ?? 0) / this.pageSize())
  );

  visiblePages = computed(() => {
    const total = this.totalPages();
    const current = this.pageIndex();
    const maxVisible = 5;
    const start = Math.max(0, Math.min(current - 2, total - maxVisible));
    const end = Math.min(total, start + maxVisible);
    return Array.from({ length: end - start }, (_, i) => start + i);
  });

  toggleSort(column: string) {
    if (this.sortColumn() === column) {
      this.sortDirection.set(
        this.sortDirection() === 'asc'
          ? 'desc'
          : this.sortDirection() === 'desc'
          ? ''
          : 'asc'
      );
      if (this.sortDirection() === '') this.sortColumn.set(null);
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
    this.pageIndex.set(0); // Reset to first page
  }

  nextPage() {
    if (this.pageIndex() < this.totalPages() - 1)
      this.pageIndex.set(this.pageIndex() + 1);
  }

  prevPage() {
    if (this.pageIndex() > 0) this.pageIndex.set(this.pageIndex() - 1);
  }
}

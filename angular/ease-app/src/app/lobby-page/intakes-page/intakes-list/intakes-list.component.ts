/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  signal,
  type OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Intake, IntakeService, ProfileService } from '@ease-angular/services';
import {
  ColumnDef,
  LobbySubPageLayoutComponent,
  TableCdkComponent,
} from '@ease-angular/ui';
import { IntakeDto } from '@ease/dto';
import { dateToYYYYMMDD } from '@ease/utils';
import { Timestamp } from 'firebase/firestore';

interface IntakeListTableColDef {
  createdBy: string;
  createdOn: Timestamp;
  initiative: string;
  deadline: Date;
  requestorName: string;
  title: string;
  id: string;
}

@Component({
  selector: 'app-intakes-list',
  imports: [CommonModule, LobbySubPageLayoutComponent, TableCdkComponent],
  templateUrl: './intakes-list.component.html',
  styleUrl: './intakes-list.component.css',
})
export class IntakesListComponent implements OnInit {
  private intakesService = inject(IntakeService);
  private cdr = inject(ChangeDetectorRef);
  private profileService = inject(ProfileService);
  private router = inject(Router);

  private intakes: IntakeDto[] = [];
  private intakesByOwner: IntakeDto[] = [];

  datasource: IntakeListTableColDef[] = [];

  columnDef: ColumnDef<IntakeListTableColDef>[] = [
    {
      columnDef: 'initiative',
      header: 'Initiative',
      cell: (row) => row.initiative,
    },
    {
      columnDef: 'requestorName',
      header: 'Client',
      cell: (row) => row.requestorName,
    },
    {
      columnDef: 'title',
      header: 'Title',
      cell: (row) => row.title,
    },

    {
      columnDef: 'createdOn',
      header: 'Created On',
      cell: (row) => dateToYYYYMMDD(row.createdOn),
    },
    {
      columnDef: 'createdBy',
      header: 'Created By',
      cell: (row) => row.createdBy,
      sort: true,
    },
    {
      columnDef: 'deadline',
      header: 'Deadline',
      cell: (row) => dateToYYYYMMDD(row.deadline),
    },
  ];

  isFilteredByOwner = signal(false);

  async ngOnInit() {
    this.intakes = await this.intakesService.getIntakes();
    this.intakesByOwner = await this.intakesService.getIntakesByOwner(
      this.profileService.profile_()!.userId
    );
    this.setDatasource();
    this.cdr.markForCheck();
  }

  onTableClickRow(row: IntakeListTableColDef) {
    this.router.navigate(['/', 'lobby', 'intakes', row.id]);
  }

  filterIntakes() {
    const currentState = this.isFilteredByOwner();
    this.isFilteredByOwner.set(!currentState);
    this.setDatasource();
  }

  private setDatasource(): void {
    let data: IntakeDto[] = [];

    if (!this.isFilteredByOwner()) data = this.intakes;
    else data = this.intakesByOwner;

    this.datasource = data
      .filter((intake) => intake.createdOn !== undefined)
      .map((intake) => {
        const { givenName, familyName, createdOn, id } = intake;
        const { initiative, deadline } = intake.businessContext;
        const { name, title } = intake.requestorInformation;

        return {
          createdBy:
            givenName || familyName ? `${givenName} ${familyName}` : '-',
          createdOn: createdOn as Timestamp,
          initiative,
          deadline: new Date(deadline),
          requestorName: name,
          title,
          id: id || '',
        };
      });
  }
}

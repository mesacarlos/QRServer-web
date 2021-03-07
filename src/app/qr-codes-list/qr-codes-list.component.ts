import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { merge, of as observableOf } from 'rxjs';
import { UserService } from '../core/service/user.service';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { openSnackBar } from '../core/util/snackBarUtils';
import { SessionService } from '../core/service/session.service';
import { QrCodesAddComponent } from '../qr-codes-add/qr-codes-add.component';
import { MatTableDataSource } from '@angular/material/table';
import { SlicePipe } from '@angular/common';

@Component({
	selector: 'app-qr-codes-list',
	templateUrl: './qr-codes-list.component.html',
	styleUrls: ['./qr-codes-list.component.css']
})
export class QrCodesListComponent implements AfterViewInit {
	displayedColumns: string[] = ['id', 'destination_url', 'actions'];
	dataSource = new MatTableDataSource();
	resultsLength = 0;
	isLoadingResults = true;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	constructor(
		private userService: UserService,
		private sessService: SessionService,
		private _snackBar: MatSnackBar,
		public dialog: MatDialog,
		private router: Router,
		private slicePipe: SlicePipe,
	) { }

	//TODO Los qr expandibles al hacer click (ejemplo en la api)
	//TODO que los puntos suspensidos solo salgan en movil, no en pc

	ngAfterViewInit(): void {
		this.dialog.open(InfoDialogComponent, {
			width: '250px',
			data: { loading: true }
		});
		merge(this.paginator.page)
			.pipe(
				startWith({}),
				switchMap(() => {
					this.isLoadingResults = true;
					return this.userService.getLoggedUserQRCodes(this.paginator.pageSize, this.paginator.pageIndex + 1);
				}),
				map(data => {
					this.isLoadingResults = false;
					this.dialog.closeAll();
					this.resultsLength = data.totalItems;
					return data.items;
				}),
				catchError((err) => {
					if (err.status == 401) {
						openSnackBar(this._snackBar, "Error: La sesión se cerró desde otro lugar.", "Cerrar", 20000);
						this.sessService.logOutLocally();
						this.router.navigate(['/login']);
					}
					this.isLoadingResults = false;
					this.dialog.closeAll();
					return observableOf([]);
				})
			).subscribe(data => this.dataSource.data = data);
	}

	openAddDialog(): void {
		const dialogRef = this.dialog.open(QrCodesAddComponent, {
			data: {}
		});

		dialogRef.afterClosed().subscribe(result => {
			this.ngAfterViewInit();
		});
	}

	beautifyString(url: string, limit: number) {
		let noProtocol = url.replace(/(^\w+:|^)\/\//, '');
		if (noProtocol.length > limit)
			return this.slicePipe.transform(noProtocol, 0, limit - 3) + "...";
		return noProtocol;
	}

}
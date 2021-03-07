import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { merge, Observable, of as observableOf } from 'rxjs';
import { UserService } from '../core/service/user.service';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { QRCode } from '../core/model/qrcode.model';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { openSnackBar } from '../core/util/snackBarUtils';
import { SessionService } from '../core/service/session.service';

@Component({
	selector: 'app-qr-codes-list',
	templateUrl: './qr-codes-list.component.html',
	styleUrls: ['./qr-codes-list.component.css']
})
export class QrCodesListComponent implements AfterViewInit {
	displayedColumns: string[] = ['id', 'destination_url', 'actions'];
	dataSource: QRCode[] = [];
	resultsLength = 0;
	isLoadingResults = true;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	constructor(
		private userService: UserService,
		private sessService: SessionService,
		private _snackBar: MatSnackBar,
		public dialog: MatDialog,
		private router: Router
	) { }

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
					return this.userService.getLoggedUserQRCodes(this.paginator.pageSize, this.paginator.pageIndex+1);
				}),
				map(data => {
					// Flip flag to show that loading has finished.
					this.isLoadingResults = false;
					this.dialog.closeAll();
					this.resultsLength = data.totalItems;
					return data.items;
				}),
				catchError((err) => {
					if (err.status == 401){
						openSnackBar(this._snackBar, "Error: La sesión se cerró desde otro lugar.", "Cerrar", 20000);
						this.sessService.logOutLocally();
						this.router.navigate(['/login']);
					}
					this.isLoadingResults = false;
					this.dialog.closeAll();
					return observableOf([]);
				})
			).subscribe(data => this.dataSource = data);
	}

}
//TODO Los qr expandibles al hacer click (ejemplo en la api)
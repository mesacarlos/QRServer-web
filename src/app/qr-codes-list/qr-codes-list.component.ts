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

@Component({
	selector: 'app-qr-codes-list',
	templateUrl: './qr-codes-list.component.html',
	styleUrls: ['./qr-codes-list.component.css']
})
export class QrCodesListComponent implements AfterViewInit {
	displayedColumns: string[] = ['id', 'destination_url', 'created_at', 'actions'];
	dataSource: QRCode[] = [];
	resultsLength = 0;
	isLoadingResults = true;
	isRateLimitReached = false;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	constructor(
		private userService: UserService,
		private _snackBar: MatSnackBar,
		public dialog: MatDialog,
		private router: Router
	) { }

	ngAfterViewInit(): void {
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
					this.isRateLimitReached = false;
					this.resultsLength = data.totalItems;

					return data.items;
				}),
				catchError(() => {
					this.isLoadingResults = false;
					// Catch if the GitHub API has reached its rate limit. Return empty data.
					this.isRateLimitReached = true;
					return observableOf([]);
				})
			).subscribe(data => this.dataSource = data);
	}

}
//TODO Los qr expandibles al hacer click (ejemplo en la api)
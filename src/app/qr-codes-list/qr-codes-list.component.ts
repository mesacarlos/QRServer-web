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
import { animate, state, style, transition, trigger } from '@angular/animations';
import { QRCode } from '../core/model/qrcode.model';
import { QRCodeService } from '../core/service/qrcode.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { QrCodesListOptionsComponent } from '../qr-codes-list-options/qr-codes-list-options.component';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-qr-codes-list',
	templateUrl: './qr-codes-list.component.html',
	styleUrls: ['./qr-codes-list.component.css'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class QrCodesListComponent implements AfterViewInit {
	columnsToDisplay: string[] = ['id', 'destination_url', 'actions'];
	dataSource = new MatTableDataSource<QRCode>();
	resultsLength = 0;
	isLoadingResults = true;
	expandedElement: QRCode | null;
	env = environment;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	constructor(
		private userService: UserService,
		private sessService: SessionService,
		private _snackBar: MatSnackBar,
		public dialog: MatDialog,
		private router: Router,
		private slicePipe: SlicePipe,
		private qrCodesService: QRCodeService,
		private _bottomSheet: MatBottomSheet,
		private sanitizer: DomSanitizer
	) { }

	//TODO Los qr expandibles al hacer click (ejemplo en la api)
	//TODO que los puntos suspensidos solo salgan en movil, no en pc (33% width de cada columna o similar)

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

	expandRow(element: QRCode) {
		this.expandedElement = this.expandedElement === element ? null : element;

		//Add the svg image to the object
		let qrCode: QRCode = this.dataSource.data.find((e: QRCode) => { return e.id == element.id });

		if (qrCode.svg_image)
			return; //Image already downloaded

		this.qrCodesService.getQRCode(qrCode.id).subscribe({
			next: (r) => {
				qrCode.svg_image = this.sanitizer.bypassSecurityTrustHtml(<string> r.svg_image);
			},
			error: (err) => {
				if (err.status == 401) {
					openSnackBar(this._snackBar, "Error: La sesión se cerró desde otro lugar.", "Cerrar", 20000);
					this.sessService.logOutLocally();
					this.router.navigate(['/login']);
				}
				if (err.status == 404) {
					openSnackBar(this._snackBar, "Error: El Token no existe", "Cerrar", 20000);
				} else {
					openSnackBar(this._snackBar, "Error al obtener datos de la API", "Cerrar", 20000);
				}
				console.log("Error creating QR Code:", err);
			}
		});
	}

	openOptionsMenu(event, element: QRCode){
		this._bottomSheet.open(QrCodesListOptionsComponent, { 
			data: {
				element: element,
				qrCodesListComponent: this,
			}
		});
		event.stopPropagation();
	}

	stopPropagation(event) {
		event.stopPropagation();
	}

	

}
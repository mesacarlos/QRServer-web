import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { QRCode } from '../core/model/qrcode.model';
import { QRCodeService } from '../core/service/qrcode.service';
import { SessionService } from '../core/service/session.service';
import { openSnackBar } from '../core/util/snackBarUtils';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { QrCodesEditComponent } from '../qr-codes-edit/qr-codes-edit.component';
import { QrCodesListComponent } from '../qr-codes-list/qr-codes-list.component';


@Component({
	selector: 'app-qr-codes-list-options',
	templateUrl: './qr-codes-list-options.component.html',
	styleUrls: ['./qr-codes-list-options.component.css']
})
export class QrCodesListOptionsComponent {
	env = environment;
	
	constructor(
		private _bottomSheetRef: MatBottomSheetRef<QrCodesListOptionsComponent>,
		private qrCodesService: QRCodeService,
		public dialog: MatDialog,
		private _snackBar: MatSnackBar,
		private sessService: SessionService,
		private router: Router,
		@Inject(MAT_BOTTOM_SHEET_DATA) public data: { element: QRCode, qrCodesListComponent: QrCodesListComponent }
	) { }

	dismiss(event: MouseEvent): void {
		this._bottomSheetRef.dismiss();
	}

	editQR(event: MouseEvent): void {
		this._bottomSheetRef.dismiss();

		const editDialogRef = this.dialog.open(QrCodesEditComponent, {
			data: {element: this.data.element}
		});
		editDialogRef.afterClosed().subscribe(result => {
			this.data.qrCodesListComponent.ngAfterViewInit(); //Reload list
		});
	}

	customizeQR(event: MouseEvent): void {
		this._bottomSheetRef.dismiss();
	}

	deleteQR(event: MouseEvent): void {
		this._bottomSheetRef.dismiss();
		this.dialog.open(InfoDialogComponent, {
			width: '250px',
			data: { loading: true }
		});
		this.qrCodesService.deleteQRCode(this.data.element.id).subscribe({
			next: (r) => {
				this.dialog.closeAll();
				openSnackBar(this._snackBar, "Código QR Borrado", "Cerrar", 10000, 'center', 'bottom');
				this.data.qrCodesListComponent.ngAfterViewInit(); //Reload list
			},
			error: (err) => {
				if (err.status == 401) {
					openSnackBar(this._snackBar, "Error: La sesión se cerró desde otro lugar.", "Cerrar", 20000);
					this.sessService.logOutLocally();
					this.router.navigate(['/login']);
				}
				this.dialog.closeAll();
			}
		})
	}

}

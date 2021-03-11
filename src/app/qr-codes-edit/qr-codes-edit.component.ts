import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { QRCode } from '../core/model/qrcode.model';
import { QRCodeService } from '../core/service/qrcode.service';
import { SessionService } from '../core/service/session.service';
import { FormErrorStateMatcher } from '../core/util/FormErrorStateMatcher';
import { openSnackBar } from '../core/util/snackBarUtils';

@Component({
	selector: 'app-qr-codes-edit',
	templateUrl: './qr-codes-edit.component.html',
	styleUrls: ['./qr-codes-edit.component.css']
})
export class QrCodesEditComponent implements OnInit {
	public isLoading: boolean = false;

	matcher = new FormErrorStateMatcher();
	destinationFormControl = new FormControl('', [
		Validators.required,
	]);
	identifierFormControl = new FormControl('', [
		Validators.minLength(3),
		Validators.maxLength(16),
	]);

	constructor(
		private dialogRef: MatDialogRef<QrCodesEditComponent>, //El dialogo de este componente
		private qrCodesService: QRCodeService,
		private _snackBar: MatSnackBar,
		private sessService: SessionService,
		private router: Router,
		@Inject(MAT_DIALOG_DATA) public data: { element: QRCode }
	) { }

	ngOnInit() {
		this.destinationFormControl.setValue(this.data.element.destination_url);
		this.identifierFormControl.setValue(this.data.element.id);
	}

	clickSend() {
		if (this.destinationFormControl.errors != null)
			return false; //Hay errores en el formulario

		this.isLoading = true;
		this.qrCodesService.updateQRCode(this.data.element.id, this.identifierFormControl.value, this.destinationFormControl.value).subscribe({
			next: (r) => {
				this.dialogRef.close();
			},
			error: (err) => {
				this.dialogRef.close();
				if (err.status == 401) {
					openSnackBar(this._snackBar, "Error: La sesión se cerró desde otro lugar.", "Cerrar", 20000);
					this.sessService.logOutLocally();
					this.router.navigate(['/login']);
				} else if (err.status == 404) {
					openSnackBar(this._snackBar, "Error: El QR no existe", "Cerrar", 20000, 'center', 'bottom');
				} else if(err.status == 403) {
					openSnackBar(this._snackBar, "Error: No tienes permiso para realizar esta acción", "Cerrar", 20000, 'center', 'bottom');
				} else {
					openSnackBar(this._snackBar, "Error al editar código QR", "Cerrar", 20000);
				}
				console.log("Error editing QR Code:", err);
			}
		});

		return false;
	}

	clickCancel() {
		this.dialogRef.close();
	}

}
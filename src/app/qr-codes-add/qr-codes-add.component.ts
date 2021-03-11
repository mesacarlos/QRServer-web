import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QRCodeService } from '../core/service/qrcode.service';
import { FormErrorStateMatcher } from '../core/util/FormErrorStateMatcher';
import { openSnackBar } from '../core/util/snackBarUtils';

@Component({
	selector: 'app-qr-codes-add',
	templateUrl: './qr-codes-add.component.html',
	styleUrls: ['./qr-codes-add.component.css']
})
export class QrCodesAddComponent {
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
		private dialogRef: MatDialogRef<QrCodesAddComponent>, //El dialogo de este componente
		private qrCodesService: QRCodeService,
		private _snackBar: MatSnackBar,
	) { }

	clickSend() {
		if (this.destinationFormControl.errors != null)
			return false; //Hay errores en el formulario

		this.isLoading = true;
		this.qrCodesService.createQRCode(this.identifierFormControl.value, this.destinationFormControl.value).subscribe({
			next: (r) => {
				this.dialogRef.close();
			},
			error: (err) => {
				this.dialogRef.close();
				if (err.status == 422) {
					if (err.error.id)
						openSnackBar(this._snackBar, "Error: El ID ya existe o usa caracteres no permitidos", "Cerrar", 20000, 'center', 'bottom');
				} else {
					openSnackBar(this._snackBar, "Error al crear código QR", "Cerrar", 20000);
				}
				console.log("Error creating QR Code:", err);
			}
		});


		return false;
	}

	clickCancel() {
		this.dialogRef.close();
	}
}
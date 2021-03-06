import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../core/service/auth.service';
import { FormErrorStateMatcher } from '../core/util/FormErrorStateMatcher';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	constructor(
		private authService: AuthService,
		private _snackBar: MatSnackBar,
		public dialog: MatDialog,
		private router: Router
	) { }
	ngOnInit(): void {
	}

	matcher = new FormErrorStateMatcher();
	usernameFormControl = new FormControl('', [
		Validators.required,
		Validators.maxLength(24),
	]);
	emailFormControl = new FormControl('', [
		Validators.required,
		Validators.email,
	]);
	passwordFormControl = new FormControl('', [
		Validators.required,
		Validators.maxLength(64),
	]);
	passwordConfirmFormControl = new FormControl('', [
		Validators.required,
		Validators.maxLength(64),
	]);

	clickRegister() {
		if (this.usernameFormControl.errors != null || this.emailFormControl.errors != null
			|| this.passwordFormControl.errors != null || this.passwordConfirmFormControl.errors != null)
			return false; //Hay errores en el formulario

		if (this.passwordFormControl.value != this.passwordConfirmFormControl.value) {
			this.openSnackBar("Error: Las contraseñas no coinciden", "Cerrar");
			return false; //Las cntraseñas no coinciden
		}

		//Fields OK, register
		this.dialog.open(InfoDialogComponent, {
			width: '250px',
			data: { loading: true }
		});
		this.authService.register(this.usernameFormControl.value, this.emailFormControl.value, this.passwordFormControl.value).subscribe({
			next: (r) => {
				this.dialog.closeAll();
				this.router.navigate(['verify-email']);
			},
			error: (err) => {
				this.dialog.closeAll();
				if (err.error.email)
					this.openSnackBar("Error: Ya existe una cuenta con la dirección de email indicada", "Cerrar");
				else
					this.openSnackBar("Error: " + err.message, "Cerrar");
				console.log(err)
			}
		});
		return false;
	}

	openSnackBar(message: string, action: string) {
		this._snackBar.open(message, action, {
			duration: 20000,
			horizontalPosition: 'right',
		});
	}

}

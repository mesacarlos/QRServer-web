import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SessionService } from '../core/service/session.service';
import { UserService } from '../core/service/user.service';
import { FormErrorStateMatcher } from '../core/util/FormErrorStateMatcher';
import { openSnackBar } from '../core/util/snackBarUtils';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
	currentTabIndex: number = 0;
	constructor(
		private userService: UserService,
		private sessService: SessionService,
		private _snackBar: MatSnackBar,
		public dialog: MatDialog,
		private router: Router
	) { }
	ngOnInit(): void {
	}

	matcher = new FormErrorStateMatcher();
	usernameEditFormControl = new FormControl('', [
		Validators.maxLength(24),
	]);
	emailEditFormControl = new FormControl('', [
		Validators.email,
	]);
	passwordEditFormControl = new FormControl('', [
		Validators.maxLength(64),
	]);
	passwordConfirmEditFormControl = new FormControl('', [
		Validators.maxLength(64),
	]);
	passwordDeleteFormControl = new FormControl('', [
		Validators.required,
		Validators.maxLength(64),
	]);

	clickEditAccount() {
		if (this.usernameEditFormControl.errors != null || this.emailEditFormControl.errors != null
			|| this.passwordEditFormControl.errors != null || this.passwordConfirmEditFormControl.errors != null)
			return false; //Errors in the form

		if (this.passwordEditFormControl.value != this.passwordConfirmEditFormControl.value) {
			openSnackBar(this._snackBar, "Error: Las contraseñas no coinciden", "Cerrar", 20000);
			return false; //Las cntraseñas no coinciden
		}

		//Fields OK, update account
		this.dialog.open(InfoDialogComponent, {
			width: '250px',
			data: { loading: true }
		});
		this.userService.updateSelfAccount(this.usernameEditFormControl.value, this.emailEditFormControl.value, this.passwordEditFormControl.value).subscribe({
			next: (r) => {
				//TODO Probar si mandamos un email o algo que no pase el validador del back que error devuelve
				this.dialog.closeAll();
				openSnackBar(this._snackBar, "Cuenta actualizada correctamente", "Cerrar", 10000);
				this.currentTabIndex = 0;

				//Clear the form
				this.usernameEditFormControl.reset();
				this.emailEditFormControl.reset();
				this.passwordEditFormControl.reset();
				this.passwordConfirmEditFormControl.reset();
			},
			error: (err) => {
				this.dialog.closeAll();
				if (err.status == 401) {
					openSnackBar(this._snackBar, "Error: La sesión se cerró desde otro lugar.", "Cerrar", 20000);
					this.sessService.logOutLocally();
					this.router.navigate(['/login']);
				} else if (err.status == 422) {
					if (err.error.username)
						openSnackBar(this._snackBar, "Error: El nombre de usuario no es valido.", "Cerrar", 20000);
					else if (err.error.email)
						openSnackBar(this._snackBar, "Error: El email no es válido o ya está en uso.", "Cerrar", 20000);
					else if (err.error.password)
						openSnackBar(this._snackBar, "Error: La contraseña no es valida.", "Cerrar", 20000);
					else
						openSnackBar(this._snackBar, "Error: Los datos enviados no son válidos", "Cerrar", 20000);
					console.log(err)
				} else
					openSnackBar(this._snackBar, "Error al actualizar la cuenta: " + err.message, "Cerrar", 20000);
			}
		});

		return false;
	}

	clickDelete() {
		if (this.passwordDeleteFormControl.errors != null)
			return false;

		//Fields OK, delete the account
		this.dialog.open(InfoDialogComponent, {
			width: '250px',
			data: { loading: true }
		});
		this.userService.deleteSelfAccount(this.passwordDeleteFormControl.value).subscribe({
			next: (r) => {
				this.dialog.closeAll();
				openSnackBar(this._snackBar, "Cuenta borrada correctamente", "Cerrar", 20000);
				localStorage.removeItem("api_token");
				this.sessService.lastIsLoggedInResponse = false;
				this.router.navigate(['/']);
			},
			error: (err) => {
				this.dialog.closeAll();
				if (err.status == 401) {
					openSnackBar(this._snackBar, "Error: La sesión se cerró desde otro lugar.", "Cerrar", 20000);
					this.sessService.logOutLocally();
					this.router.navigate(['/login']);
				}
				if (err.status == 403)
					openSnackBar(this._snackBar, "Error: Contraseña incorrecta", "Cerrar", 20000);
				else
					openSnackBar(this._snackBar, "Error al borrar la cuenta: " + err.message, "Cerrar", 20000);
			}
		});

		return false;
	}

}
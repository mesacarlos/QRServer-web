import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../core/service/auth.service';
import { SessionService } from '../core/service/session.service';
import { FormErrorStateMatcher } from '../core/util/FormErrorStateMatcher';
import { openSnackBar } from '../core/util/snackBarUtils';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	constructor(
		private authService: AuthService,
		private sessService: SessionService,
		private _snackBar: MatSnackBar,
		public dialog: MatDialog,
		private router: Router
	) { }
	ngOnInit(): void { }

	matcher = new FormErrorStateMatcher();
	emailFormControl = new FormControl('', [
		Validators.required,
		Validators.email,
	]);
	passwordFormControl = new FormControl('', [
		Validators.required,
		Validators.maxLength(64),
	]);

	clickLogin() {
		if (this.emailFormControl.errors != null || this.passwordFormControl.errors != null)
			return false;

		//Fields OK, go login
		this.dialog.open(InfoDialogComponent, {
			width: '250px',
			data: { loading: true }
		});
		this.authService.login(this.emailFormControl.value, this.passwordFormControl.value).subscribe({
			next: (r) => {
				this.dialog.closeAll();
				this.sessService.startSession(r.api_token).subscribe({
					next: (r) => {
						this._snackBar.dismiss();
						this.router.navigate(['qrcodes']);
					},
					error: (err) => {
						openSnackBar(this._snackBar, "Error al crear la sesión.", "Cerrar", 20000);
						console.log("Error al crear sesion: ", err);
					}
				})
			},
			error: (err) => {
				this.dialog.closeAll();
				if (err.status == 401)
					openSnackBar(this._snackBar, "Por favor, verifica tu cuenta para iniciar sesión. Hemos reenviado un mail a tu dirección de correo electrónico con mas información.", "Cerrar", 20000);
				if (err.status == 403)
					openSnackBar(this._snackBar, "Dirección de email o contraseña incorrectas", "Cerrar", 20000);
				console.log("Login error:", err)
			}
		});

		return false;
	}

}
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/service/auth.service';
import { FormErrorStateMatcher } from '../core/util/FormErrorStateMatcher';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
	isTokenSet: boolean;
	tokenId: string;

	constructor(
		private route: ActivatedRoute,
		private authService: AuthService,
		private _snackBar: MatSnackBar,
		public dialog: MatDialog,
		private router: Router
	) { }

	ngOnInit(): void {
		this.isTokenSet = this.route.snapshot.params.id != null;
		this.tokenId = this.route.snapshot.params.id;
	}

	matcher = new FormErrorStateMatcher();
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

	clickSubmitEmail() {
		if (this.emailFormControl.errors != null)
			return false;

		//No errors, go restore pwd
		this.dialog.open(InfoDialogComponent, {
			width: '250px',
			data: { loading: true }
		});
		this.authService.forgotPasswordSend(this.emailFormControl.value).subscribe({
			next: (r) => {
				this.dialog.closeAll();
				this.openSnackBar("¡Hecho! Si existe alguna cuenta registrada con dicho email, recibirás un correo con mas información.", "Cerrar");
			},
			error: (err) => {
				this.dialog.closeAll();
				//Nunca deberia de entrar aqui... solo se devuelve true....
				this.openSnackBar("Error: " + err.message, "Cerrar");
			}
		});
		return false;
	}

	clickSubmitChangePwd(id: string) {
		if (this.passwordFormControl.errors != null || this.passwordConfirmFormControl.errors != null)
			return false;

		if (this.passwordFormControl.value != this.passwordConfirmFormControl.value) {
			this.openSnackBar("Error: Las contraseñas no coinciden", "Cerrar");
			return false; //Las cnotraseñas no coinciden
		}

		//Campos OK, recuperar contraseña
		this.dialog.open(InfoDialogComponent, {
			width: '250px',
			data: { loading: true }
		});
		this.authService.forgotPasswordVerify(this.tokenId, this.passwordFormControl.value).subscribe({
			next: (r) => {
				this.dialog.closeAll();
				this.openSnackBar("¡Exito! Ahora puedes iniciar sesión", "Cerrar");
				this.router.navigate(['login']);
			},
			error: (err) => {
				if (err.status == 403)
					this.openSnackBar("Error: No existe ningún token con el valor indicado, o el usuario no existe", "Cerrar");
				console.log("API returned error:", err)
			}
		})
		//TODO recoger el id del this. y las dos nuevas pwd del form. Si no coinciden error. Si coinciden enviar peticion cambiar pwd. Si exito redireccion a login
		return false;
	}

	openSnackBar(message: string, action: string) {
		this._snackBar.open(message, action, {
			duration: 100000,
			horizontalPosition: 'right',
		});
	}

}
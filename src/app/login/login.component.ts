import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../core/service/auth.service';
import { SessionService } from '../core/service/session.service';

export class LoginErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

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
		private router: Router
	) { }
	ngOnInit(): void { }

	matcher = new LoginErrorStateMatcher();
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
		this.authService.login(this.emailFormControl.value, this.passwordFormControl.value).subscribe(r => {
			this.sessService.startSession(r.api_token);
			this.router.navigate(['qrcodes']);
		}, (err) => {
			if (err.status == 401)
				this.openSnackBar("Por favor, verifica tu cuenta para iniciar sesión. Hemos reenviado un mail a tu dirección de correo electrónico con mas información.", "Cerrar");
			if (err.status == 403)
				this.openSnackBar("Dirección de email o contraseña incorrectas", "Cerrar");
			console.log("Login error:", err)
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
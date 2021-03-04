import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../core/service/auth.service';

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
		private _snackBar: MatSnackBar
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
			localStorage.setItem("api_token", r.api_token);
			//Redirección del usuario a /qrcodes
		}, (err) => {
			if (err.status == 403)
				this.openSnackBar("Dirección de email o contraseña incorrectas", "Cerrar");
			console.log("Login error:", err)
		});
		console.log(localStorage.api_token)
		return false;
	}

	openSnackBar(message: string, action: string) {
		this._snackBar.open(message, action, {
			duration: 20000,
			horizontalPosition: 'right',
		});
	}

}

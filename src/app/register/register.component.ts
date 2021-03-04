import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../core/service/auth.service';

export class RegisterErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	constructor(
		private authService: AuthService,
		private _snackBar: MatSnackBar,
		private router: Router
	) { }
	ngOnInit(): void { }

	matcher = new RegisterErrorStateMatcher();
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
		if (this.emailFormControl.errors != null || this.passwordFormControl.errors != null)
			return false;

		//Fields OK, go login
		this.authService.register(this.usernameFormControl.value, this.emailFormControl.value, this.passwordFormControl.value).subscribe(r => {
			console.log()
			this.router.navigate(['verify-email']);
		}, (err) => {
			if(err.error.email)
				this.openSnackBar("Error: Ya existe una cuenta con la dirección de email indicada", "Cerrar");
			else
				this.openSnackBar("Error: " + err.message, "Cerrar");
			console.log(err)
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
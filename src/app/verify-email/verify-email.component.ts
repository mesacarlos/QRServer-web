import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/service/auth.service';
import { openSnackBar } from '../core/util/snackBarUtils';

@Component({
	selector: 'app-verify-email',
	templateUrl: './verify-email.component.html',
	styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
	isTokenSet: boolean;

	constructor(
		private route: ActivatedRoute,
		private authService: AuthService,
		private _snackBar: MatSnackBar,
		private router: Router
	) { }

	ngOnInit(): void {
		this.isTokenSet = this.route.snapshot.params.id != null;

		if (this.isTokenSet)
			this.verificarCuenta(this.route.snapshot.params.id);
	}

	private verificarCuenta(id: string): void {
		this.authService.verifyEmail(id).subscribe({
			next: (r) => {
				console.log("Account verify (true=success, false=problems): ", r);
				openSnackBar(this._snackBar, "Éxito! Ahora puedes iniciar sesión en tu cuenta. Gracias por completar tu registro.", "Cerrar", 20000);
				this.router.navigate(['login']);
			},
			error: (err) => {
				if (err.status == 403)
					openSnackBar(this._snackBar, "Ocurrió un error. Tu cuenta ya fue verificada, el Token indicado no existe, no existe ningún usuario vinculado a este token o el email del usuario fué modificado.", "Cerrar", 20000);
				this.router.navigate(['/']);
				console.log("Email verification error:", err)
			}
		});
	}

}
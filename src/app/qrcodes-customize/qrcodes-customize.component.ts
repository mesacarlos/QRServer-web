import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { QRCode } from '../core/model/qrcode.model';
import { QRCodeService } from '../core/service/qrcode.service';
import { SessionService } from '../core/service/session.service';
import { FormErrorStateMatcher } from '../core/util/FormErrorStateMatcher';
import { openSnackBar } from '../core/util/snackBarUtils';

@Component({
	selector: 'app-qrcodes-customize',
	templateUrl: './qrcodes-customize.component.html',
	styleUrls: ['./qrcodes-customize.component.css']
})
export class QrcodesCustomizeComponent implements OnInit, OnDestroy {
	matcher = new FormErrorStateMatcher();
	foregroundFormControl = new FormControl('', [
	]);
	backgroundFormControl = new FormControl('', [
	]);
	sizeFormControl = new FormControl(256, [
		Validators.required,
		Validators.min(32),
		Validators.max(2048),
	]);

	generatedQRCode: QRCode;
	generatedQRCodeDate: Date;
	selectedDotStyle: NameValuePair = { nombre: 'Estándar', valor: 'square' };
	selectedReadedFile: string; //Base64 image
	dotStyles: NameValuePair[] = [
		{ nombre: 'Estándar', valor: 'square' },
		{ nombre: 'Puntos', valor: 'dot' },
		{ nombre: 'Redondeado', valor: 'round' },
	];
	modelChanged: Subject<string> = new Subject<string>();
	private subscription: Subscription;
	debounceTime = 700;

	constructor(
		private route: ActivatedRoute,
		private sessService: SessionService,
		private _snackBar: MatSnackBar,
		private qrCodesService: QRCodeService,
		private sanitizer: DomSanitizer,
		private router: Router,
	) { }

	ngOnInit(): void {
		if (this.route.snapshot.params.id == null) {
			//Devolvemos al usuario a la lista de QRs ya que no hay QRCode id
			this.router.navigate(['qrcodes']);
		}

		//Metodo a llamar cuando el usuario modifique un valor, para regenerar el QR
		this.foregroundFormControl.valueChanges.subscribe(() => this.modelChanged.next());
		this.backgroundFormControl.valueChanges.subscribe(() => this.modelChanged.next());
		this.sizeFormControl.valueChanges.subscribe(() => this.modelChanged.next());
		//Cargamos info del QR
		this.generateQRCode();

		//Suscriptor que llamará a la API con cierto delay tras modificar un campo
		this.subscription = this.modelChanged.pipe(
			debounceTime(this.debounceTime),
		).subscribe(() => {
			if(this.sizeFormControl.valid)
				this.generateQRCode();
		}
		);
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	generateQRCode() {
		this.qrCodesService.customizeQRCode(this.route.snapshot.params.id,
			this.foregroundFormControl.value.toString(),
			this.backgroundFormControl.value.toString(),
			this.selectedDotStyle.valor,
			this.sizeFormControl.value,
			this.selectedReadedFile?.split(',')[1],
		).subscribe({
			next: (r) => {
				this.generatedQRCode = r;
				this.generatedQRCodeDate = new Date(r.created_at);
				this.generatedQRCode.png_image = this.sanitizer.bypassSecurityTrustResourceUrl(r.png_image + "");
			},
			error: (err) => {
				if (err.status == 401) {
					openSnackBar(this._snackBar, "Error: La sesión se cerró desde otro lugar.", "Cerrar", 20000);
					this.sessService.logOutLocally();
					this.router.navigate(['/login']);
				}
				if (err.status == 404) {
					openSnackBar(this._snackBar, "Error: El Token no existe", "Cerrar", 20000);
				} else {
					openSnackBar(this._snackBar, "Error al obtener datos de la API", "Cerrar", 20000);
				}
				console.log("Error creating QR Code:", err);
			}
		});
	}

	fileChanged(evt) {
		try {
			let fileReader = new FileReader();
			fileReader.onload = (e) => {
				this.selectedReadedFile = fileReader.result.toString();
				this.generateQRCode();
			}
			fileReader.readAsDataURL(evt.target.files[0]);
		} catch (err) {
			this.selectedReadedFile = "";
		}

	}

}

interface NameValuePair {
	nombre: string;
	valor: string;
}
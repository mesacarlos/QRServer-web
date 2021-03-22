import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { QRCodeService } from '../core/service/qrcode.service';
import { SessionService } from '../core/service/session.service';
import { FormErrorStateMatcher } from '../core/util/FormErrorStateMatcher';

@Component({
	selector: 'app-qrcodes-customize',
	templateUrl: './qrcodes-customize.component.html',
	styleUrls: ['./qrcodes-customize.component.css']
})
export class QrcodesCustomizeComponent implements OnInit {
	matcher = new FormErrorStateMatcher();
	sizeFormControl = new FormControl(256, [
		Validators.required,
		Validators.min(32),
		Validators.max(2048),
	]);
	
	dotStyles: NameValuePair[] = [
		{nombre: 'Estándar', valor: 'square'},
		{nombre: 'Puntos', valor: 'dot'},
		{nombre: 'Redondeado', valor: 'round'},
	];

	//Variables para los valores de los inputs
	idQRCodeIdSet: boolean;
	selectedDotStyle: NameValuePair = {nombre: 'Estándar', valor: 'square'};
	selectedSize: number = 256;

	constructor(
		private route: ActivatedRoute,
		private sessService: SessionService,
		private dialog: MatDialog,
		private qrCodesService: QRCodeService,
		private sanitizer: DomSanitizer,
		private router: Router
	) { }

	ngOnInit(): void {
		this.idQRCodeIdSet = this.route.snapshot.params.id != null;

		if (!this.idQRCodeIdSet){
			//Devolvemos al usuario a la lista de QRs ya que no hay QRCode id
			this.router.navigate(['qrcodes']);
		}

		//Cargamos info del QR
		this.generateQRCode();
	}

	generateQRCode() {

	}

}

interface NameValuePair {
	nombre: string;
	valor: string;
}
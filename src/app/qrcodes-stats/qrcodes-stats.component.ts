import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QRCode } from '../core/model/qrcode.model';
import { QRCodeStats } from '../core/model/qrcodeStats';
import { QRCodeService } from '../core/service/qrcode.service';
import { SessionService } from '../core/service/session.service';
import { openSnackBar } from '../core/util/snackBarUtils';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

@Component({
	selector: 'app-qrcodes-stats',
	templateUrl: './qrcodes-stats.component.html',
	styleUrls: ['./qrcodes-stats.component.css']
})
export class QrcodesStatsComponent implements OnInit {
	qrCode: QRCode;
	qrCodeStats: QRCodeStats;
	qrCodeStatsFromCreationDate: QRCodeStats;
	maxDate: Date = new Date(); //La de mañana
	dateRangePicker = new FormGroup({
		start: new FormControl(),
		end: new FormControl() //Por defecto, hasta hoy
	});

	constructor(
		private route: ActivatedRoute,
		private sessService: SessionService,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
		private qrCodesService: QRCodeService,
		private router: Router,
	) { }

	ngOnInit(): void {
		if (this.route.snapshot.params.id == null) {
			//Devolvemos al usuario a la lista de QRs ya que no hay QRCode id
			this.router.navigate(['qrcodes']);
		}

		//Cargamos info del QR y sus estadisticas
		this.setupQRCode();
		this.setupStats();
	}

	private setupQRCode() {
		this.qrCodesService.getQRCode(this.route.snapshot.params.id).subscribe({
			next: r => {
				this.qrCode = r;
				this.qrCode.created_at = new Date(r.created_at);
				this.qrCode.updated_at = new Date(r.updated_at);
				if (this.qrCode != null && this.qrCodeStats != null && this.qrCodeStatsFromCreationDate != null) this.dialog.closeAll();

			},
			error: err => {
				if (err.status == 401) {
					openSnackBar(this._snackBar, "Error: La sesión se cerró desde otro lugar.", "Cerrar", 20000);
					this.sessService.logOutLocally();
					this.router.navigate(['/login']);
				} else if (err.status == 404) {
					openSnackBar(this._snackBar, "Error: El código QR no existe.", "Cerrar", 20000);
					this.router.navigate(['/qrcodes']);
				}

			}
		});
		this.qrCodesService.getStats(this.route.snapshot.params.id).subscribe({
			next: r => {
				this.qrCodeStatsFromCreationDate = r;
				if (this.qrCode != null && this.qrCodeStats != null && this.qrCodeStatsFromCreationDate != null) this.dialog.closeAll();

			},
			error: err => {
				if (err.status == 401) {
					openSnackBar(this._snackBar, "Error: La sesión se cerró desde otro lugar.", "Cerrar", 20000);
					this.sessService.logOutLocally();
					this.router.navigate(['/login']);
				} else if (err.status == 404) {
					openSnackBar(this._snackBar, "Error: El código QR no existe.", "Cerrar", 20000);
					this.router.navigate(['/qrcodes']);
				}

			}
		});
	}

	///
	/// VARIABLES Y FUNCIONES PARA ESTADISTICAS EN EL RANGO DE TIEMPO ESPECIFICADO
	///
	mostUsedBrowser: NameValue[];
	mostUsedOS: NameValue[];
	mostUsedLang: NameValue[];
	mostUsedDevice: NameValue[];
	// Charts options
	showXAxis: boolean = true;
	showYAxis: boolean = true;
	gradient: boolean = true;
	showXAxisLabel: boolean = true;
	xAxisLabel: string = "Porcentaje";
	colorScheme = {
		domain: ['#72d3e8', '#98f590', '#f7869c', '#C7B42C', '#f6f7d7']
	};
	setupStats() {
		this.dialog.open(InfoDialogComponent, {
			width: '250px',
			data: { loading: true }
		});
		console.log(this.dateRangePicker.value.start, this.dateRangePicker.value.end)
		this.qrCodesService.getStats(this.route.snapshot.params.id, {
			start_timestamp: Math.ceil(this.dateRangePicker.value.start?.getTime() / 1000).toString(),
			//Sumamos 86400 para obtener dia siguiente
			end_timestamp: (Math.ceil(this.dateRangePicker.value.end?.getTime() / 1000) + 86400).toString(),
		}).subscribe({
			next: r => {
				this.qrCodeStats = r;

				this.mostUsedBrowser = [];
				r.top_browser.forEach(elem => this.mostUsedBrowser.push({ name: elem.access_browser, value: elem.total }));

				this.mostUsedOS = [];
				r.top_os.forEach(elem => this.mostUsedOS.push({ name: elem.access_os, value: elem.total }));

				this.mostUsedLang = [];
				r.top_locale.forEach(elem => this.mostUsedLang.push({ name: elem.access_language, value: elem.total }));

				this.mostUsedDevice = [];
				r.top_device.forEach(elem => this.mostUsedDevice.push({ name: elem.access_device, value: elem.total }));

				if (this.qrCode != null && this.qrCodeStats != null && this.qrCodeStatsFromCreationDate != null) this.dialog.closeAll();

			},
			error: err => {
				if (err.status == 401) {
					openSnackBar(this._snackBar, "Error: La sesión se cerró desde otro lugar.", "Cerrar", 20000);
					this.sessService.logOutLocally();
					this.router.navigate(['/login']);
				} else if (err.status == 404) {
					openSnackBar(this._snackBar, "Error: El código QR no existe.", "Cerrar", 20000);
					this.router.navigate(['/qrcodes']);
				}

			}
		});
	}

}

interface NameValue {
	name: string,
	value: number
}
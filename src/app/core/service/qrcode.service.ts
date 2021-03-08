import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { QRCode } from "../model/qrcode.model";

@Injectable({
	providedIn: "root"
})
export class QRCodeService {
	private env = environment;

	constructor(private http: HttpClient) {
	}

	//TODO GET /api/v1/qrcode/{id:[A-Za-z0-9]+}
	public getQRCode(id: string): Observable<QRCode> {
		let jsonHeader = new HttpHeaders()
			.set('Content-Type', 'aplication/json')
			.set("apitoken", localStorage.getItem("api_token"));
		return this.http.get<QRCode>(this.env.API_BASE_URL + "/qrcode/" + id, {
			headers: jsonHeader
		});
	}

	//TODO POST /api/v1/qrcode
	public createQRCode(id: string, destination_url: string): Observable<QRCode> {
		if (destination_url.indexOf('http://') === -1 && destination_url.indexOf('https://') === -1)
			destination_url = 'http://' + destination_url;

		let jsonHeader = new HttpHeaders()
			.set('Content-Type', 'aplication/json')
			.set("apitoken", localStorage.getItem("api_token"));
		return this.http.post<QRCode>(this.env.API_BASE_URL + "/qrcode", {
			"id": id,
			"destination_url": destination_url,
		}, {
			headers: jsonHeader
		});
	}

	//TODO PUT /api/v1/qrcode/{id:[A-Za-z0-9]+}

	//TODO DELETE /api/v1/qrcode/{id:[A-Za-z0-9]+}

	//TODO GET /api/v1/qrcode/{id:[A-Za-z0-9]+}/qrclicks

}
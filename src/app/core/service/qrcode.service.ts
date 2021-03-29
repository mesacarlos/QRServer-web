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

	public getQRCode(id: string): Observable<QRCode> {
		let jsonHeader = new HttpHeaders()
			.set('Content-Type', 'aplication/json')
			.set("apitoken", localStorage.getItem("api_token"));
		return this.http.get<QRCode>(this.env.API_BASE_URL + "/qrcode/" + id, {
			headers: jsonHeader,
		});
		
	}

	public customizeQRCode(id: string, foreground_color?: string, background_color?: string, dot_style?: string, size?: string, base64Image?: string): Observable<QRCode> {
		let jsonHeader = new HttpHeaders()
			.set('Content-Type', 'aplication/json')
			.set("apitoken", localStorage.getItem("api_token"));
		return this.http.post<QRCode>(this.env.API_BASE_URL + "/qrcode/" + id + "/customize", Object.assign({},
			!foreground_color ? null : { foreground_color },
			!background_color ? null : { background_color },
			!dot_style ? null : { dot_style },
			!size ? null : { size },
			!base64Image ? null : { base64Image }
		),{
			headers: jsonHeader,
		});
		
	}

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

	public updateQRCode(id: string, new_id: string, destination_url: string): Observable<QRCode> {
		if (destination_url.indexOf('http://') === -1 && destination_url.indexOf('https://') === -1)
			destination_url = 'http://' + destination_url;

		let jsonHeader = new HttpHeaders()
			.set('Content-Type', 'aplication/json')
			.set("apitoken", localStorage.getItem("api_token"));
		return this.http.put<QRCode>(this.env.API_BASE_URL + "/qrcode/" + id, {
			"id": new_id,
			"destination_url": destination_url,
		}, {
			headers: jsonHeader
		});
	}

	public deleteQRCode(id: string): Observable<boolean> {
		let jsonHeader = new HttpHeaders()
			.set('Content-Type', 'aplication/json')
			.set("apitoken", localStorage.getItem("api_token"));
		return this.http.delete<boolean>(this.env.API_BASE_URL + "/qrcode/" + id, {
			headers: jsonHeader
		});
	}


}
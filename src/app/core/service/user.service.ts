import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { User } from "../model/user.model";
import { QRCode } from "../model/qrcode.model";
import { Pagination } from "../model/pagination.model";

@Injectable({
	providedIn: "root"
})
export class UserService {
	private env = environment;

	constructor(private http: HttpClient) {
	}

	public logOut(): Observable<boolean>{
		let jsonHeader = new HttpHeaders()
			.set('Content-Type', 'aplication/json')
			.set("api_token", localStorage.getItem("api_token"));
		return this.http.delete<boolean>(this.env.API_BASE_URL + "/logout", {
			headers: jsonHeader
		});
	}

	public getLoggedUser(): Observable<User>{
		let jsonHeader = new HttpHeaders()
			.set('Content-Type', 'aplication/json')
			.set("api_token", localStorage.getItem("api_token"));
		return this.http.get<User>(this.env.API_BASE_URL + "/user/me", {
			headers: jsonHeader
		});
	}

	//TODO PUT /user/me

	//TODO DELETE /user/me

	public getLoggedUserQRCodes(itemsPerPage: number, pageNumber: number): Observable<Pagination<QRCode>>{
		let jsonHeader = new HttpHeaders()
			.set('Content-Type', 'aplication/json')
			.set("api_token", localStorage.getItem("api_token"));
		return this.http.get<Pagination<QRCode>>(this.env.API_BASE_URL + "/user/me/qrcodes", {
			headers: jsonHeader,
			params: {
				"itemsPerPage": "" + itemsPerPage,
				"page": "" + pageNumber,
			},
		});
	}

}
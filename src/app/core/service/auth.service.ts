import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Token } from "../model/token.model";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	private env = environment;

	constructor(private http: HttpClient) {

	}

	public login(email: string, password: string) {
		let jsonHeader = new HttpHeaders().set('Content-Type', 'aplication/json');
		return this.http.post<Token>(this.env.API_BASE_URL + "/login", {
			"email": email,
			"password": password
		}, {
			headers: jsonHeader
		});
	}

}
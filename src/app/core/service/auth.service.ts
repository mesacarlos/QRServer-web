import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Token } from "../model/token.model";
import { environment } from "src/environments/environment";
import { User } from "../model/user.model";

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

	public register(username: string, email: string, password: string){
		let jsonHeader = new HttpHeaders().set('Content-Type', 'aplication/json');
		return this.http.post<User>(this.env.API_BASE_URL + "/register", {
			"username": username,
			"email": email,
			"password": password
		}, {
			headers: jsonHeader
		});
	}

}
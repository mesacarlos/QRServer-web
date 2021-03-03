import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
	  
  }

  clickLogin(){
	let email = "carlos@mesacarlos.es";
	let pwd = "hola";
	this.authService.login(email, pwd).subscribe(r => {
		localStorage.setItem("api_token", r.api_token);
	})
  }

}

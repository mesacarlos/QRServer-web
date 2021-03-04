import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { QrCodesListComponent } from './qr-codes-list/qr-codes-list.component';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
	{ path: '', component: IndexComponent },
	{ path: 'login', component: LoginComponent }, //Si no hay sesión activa
	{ path: 'register', component: RegisterComponent }, //Si no hay sesion activa
	{ path: 'verify-email', component: VerifyEmailComponent }, //Si no hay sesión activa
	{ path: 'verify-email/:id', component: VerifyEmailComponent }, //Si no hay sesión activa
	{ path: 'logout', component: QrCodesListComponent }, //Si HAY sesión activa
	{ path: 'qrcodes', component: QrCodesListComponent }, //Si HAY sesión activa
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

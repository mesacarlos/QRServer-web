import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { LoggedInGuard } from './core/util/LoggedInGuard';
import { NotLoggedInGuard } from './core/util/NotLoggedInGuard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { QrCodesListComponent } from './qr-codes-list/qr-codes-list.component';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
	{ path: '', component: IndexComponent },
	{ path: 'login', component: LoginComponent, canActivate: [NotLoggedInGuard] },
	{ path: 'register', component: RegisterComponent, canActivate: [NotLoggedInGuard] },
	{ path: 'verify-email', component: VerifyEmailComponent, canActivate: [NotLoggedInGuard] },
	{ path: 'verify-email/:id', component: VerifyEmailComponent, canActivate: [NotLoggedInGuard] },
	{ path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [NotLoggedInGuard] },
	{ path: 'forgot-password/:id', component: ForgotPasswordComponent, canActivate: [NotLoggedInGuard] },
	{ path: 'logout', component: LogoutComponent },
	{ path: 'account', component: AccountComponent, canActivate: [LoggedInGuard] },
	{ path: 'qrcodes', component: QrCodesListComponent, canActivate: [LoggedInGuard] },
	//TODO pagina de 404
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

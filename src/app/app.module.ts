import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterComponent } from './register/register.component';
import { IndexComponent } from './index/index.component';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { QrCodesListComponent } from './qr-codes-list/qr-codes-list.component';
import { LogoutComponent } from './logout/logout.component';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { LoggedInGuard } from './core/util/LoggedInGuard';
import { NotLoggedInGuard } from './core/util/NotLoggedInGuard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AccountComponent } from './account/account.component';
import { getSpanishPaginatorIntl } from './core/util/SpanishPaginatorIntl';
import { QrCodesAddComponent } from './qr-codes-add/qr-codes-add.component';
import { SlicePipe } from '@angular/common';
import { QrCodesListOptionsComponent } from './qr-codes-list-options/qr-codes-list-options.component';
import { MatBottomSheet, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { QrCodesEditComponent } from './qr-codes-edit/qr-codes-edit.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { QrcodesStatsComponent } from './qrcodes-stats/qrcodes-stats.component';
import { QrcodesCustomizeComponent } from './qrcodes-customize/qrcodes-customize.component';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegisterComponent,
		IndexComponent,
		VerifyEmailComponent,
		QrCodesListComponent,
		LogoutComponent,
		InfoDialogComponent,
		ForgotPasswordComponent,
		AccountComponent,
		QrCodesAddComponent,
		QrCodesListOptionsComponent,
		QrCodesEditComponent,
		QrcodesStatsComponent,
		QrcodesCustomizeComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		ReactiveFormsModule,
		MatCheckboxModule,
		MatCheckboxModule,
		MatButtonModule,
		MatInputModule,
		MatAutocompleteModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatFormFieldModule,
		MatRadioModule,
		MatSelectModule,
		MatSliderModule,
		MatSlideToggleModule,
		MatMenuModule,
		MatSidenavModule,
		MatToolbarModule,
		MatListModule,
		MatGridListModule,
		MatCardModule,
		MatStepperModule,
		MatTabsModule,
		MatExpansionModule,
		MatButtonToggleModule,
		MatChipsModule,
		MatIconModule,
		MatProgressSpinnerModule,
		MatProgressBarModule,
		MatDialogModule,
		MatTooltipModule,
		MatSnackBarModule,
		MatTableModule,
		MatSortModule,
		MatPaginatorModule,
		MatBottomSheetModule,
		FlexLayoutModule,
		ClipboardModule,
		NgxMatColorPickerModule,
		MaterialFileInputModule,
		NgxChartsModule
	],
	providers: [
		LoggedInGuard,
		NotLoggedInGuard,
		{ provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
		{ provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS },
		{ provide: LOCALE_ID, useValue: 'es-ES' },
		SlicePipe
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

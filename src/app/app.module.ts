import { FIREBASE_KEY } from './constants/app.constants';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ExpensesComponent } from './main/expenses/expenses.component';
import { IncomesComponent } from './main/incomes/incomes.component';
import { HeaderComponent } from './main/header/header.component';
import { InputComponent } from './main/input/input.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './main/navbar/navbar.component';
import { AlertBoxComponent } from './main/alert-box/alert-box.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';  

@NgModule({
	declarations: [
		AppComponent,
		ExpensesComponent,
		IncomesComponent,
		HeaderComponent,
		InputComponent,
		NavbarComponent,
		AlertBoxComponent
	],
	imports: [ 
		BrowserModule, 
		FormsModule, 
		HttpClientModule,
		AngularFireModule.initializeApp(JSON.parse(`${atob(FIREBASE_KEY)}`)),
		AngularFireAuthModule
	 ],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}

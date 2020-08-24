import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
	title = 'budgetApp';
	ngOnInit() {
		firebase.initializeApp({
			apiKey: 'AIzaSyBNuRl8BAF-XrT8laazcwAcbtJ3L3sFl8s',
			authDomain: 'budgetcalculator-01.firebaseapp.com'
		});
	}
}

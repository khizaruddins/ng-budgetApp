import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService{
    constructor() { }
    private dataTransmission = new BehaviorSubject('/');
    getData = this.dataTransmission.asObservable();

    transmitData(data){
        this.dataTransmission.next(data);
    }
}
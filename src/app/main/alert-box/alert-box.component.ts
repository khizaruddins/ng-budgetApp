import { UpdateValueService } from './../../shared/updateValue.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.css']
})
export class AlertBoxComponent implements OnInit {

  constructor(
    private updateValueService: UpdateValueService
  ) { }

  showAlert = false;
  typeOfAlert = '';
  message = '';

  ngOnInit(): void {
    this.updateValueService.alertObservable.subscribe(res=> {
      this.message = res.message;
      this.typeOfAlert = res.class;
      this.toggleAlert(res.show);
    })
  }

  toggleAlert(value){
    this.showAlert = value;
  }

}

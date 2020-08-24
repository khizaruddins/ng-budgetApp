import { Component, OnInit, OnDestroy } from '@angular/core';
import { UpdateValueService } from '../../shared/updateValue.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.css']
})
export class IncomesComponent implements OnInit, OnDestroy {
  incomeList: [] = [];
  incomeSubject: Subscription;
  constructor(private updateValue: UpdateValueService) { }

  ngOnInit() {
    this.incomeSubject = this.updateValue.sendIncomeList
      .subscribe(
        (data: []) =>{
          this.incomeList = data;
        }
      );
  }
  
  ngOnDestroy(){
    this.incomeSubject.unsubscribe();
  }

  onRemoveIncome(index: number){
    this.updateValue.updateIncome(index);
  }

  onEditIncome(index: number){
    this.updateValue.editIncome(index);
  }
}

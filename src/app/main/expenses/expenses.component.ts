import { Component, OnInit, OnDestroy } from '@angular/core';
import { UpdateValueService } from '../../shared/updateValue.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit, OnDestroy {
  expenseList: [] = [];
  expenseSubject: Subscription;
  constructor(private updateValue: UpdateValueService) { }

  ngOnInit(): void {
    this.expenseSubject = this.updateValue.sendExpenseList
      .subscribe(
        (data: [])=>{
          this.expenseList = data;
        }
      );
  }

  ngOnDestroy(): void {
    this.expenseSubject.unsubscribe();
  }

  onRemoveExpense(index: number): void{
    this.updateValue.updateExpense(index);
  }

  onEditExpense(index: number): void{
    this.updateValue.editExpense(index);
  }
}

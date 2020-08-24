import { Component, OnInit, OnDestroy } from '@angular/core';
import { UpdateValueService } from '../../shared/updateValue.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  budget: number = 0;
  budgetSubject: Subscription;

  constructor(private updateValue: UpdateValueService) { }

  ngOnInit(): void {
    this.budgetSubject = this.updateValue.sendBudgetValue
      .subscribe(
        (data: number) => {
          this.budget = data;
        }
      );
  }

  ngOnDestroy(): void {
    this.budgetSubject.unsubscribe();
  }
}
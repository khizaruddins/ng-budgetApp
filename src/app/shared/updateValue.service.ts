import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UpdateValueService{
    constructor(private httpClient: HttpClient) { }

    incomeList = [];
    expenseList = [];
    budget: number = 0;
    expense: number;
    dataObject: Object;
    url: string = 'https://budgetcalculator-01.firebaseio.com/';
    sendData = new Subject();
    sendBudgetValue = new Subject();
    sendIncomeList = new Subject();
    sendExpenseList = new Subject();
    sendEditValue = new Subject();
    alertObservable = new BehaviorSubject({ message: '', show: false, class: ''});
    alertObsData = this.alertObservable.asObservable();

    addIncome(title: string, amount: number, editMode: Object){

      if(editMode['status'] === false){
        let id = this.getCurrentId(this.incomeList);
        this.incomeList.push({
            id: ++id,
            title: title,
            amount: +amount
        });
        // send incomeList
        this.sendIncomeList.next(this.incomeList);
        // calculate budget
        this.updateBudget(+amount, 'add');
        // send budget
        this.sendBudgetValue.next(this.budget);
      } else if(editMode['status'] === true){

        this.incomeList[editMode['index']]['title'] = title;
        this.incomeList[editMode['index']]['amount'] = amount;
      
        if(amount > editMode['amount']){
          let updatedAmt = amount - editMode['amount'];
          this.updateBudget(updatedAmt, "add");
          
        } else if(amount < editMode['amount']) {
          let updatedAmt = editMode['amount'] - amount;
          this.updateBudget(updatedAmt, "minus");
        }

        this.sendBudgetValue.next(this.budget);

        this.sendIncomeList.next(this.incomeList);
      }
    }

    editIncome(index: number){
      const amount = this.incomeList[index]['amount'];
      const title = this.incomeList[index]['title'];
      const id = this.incomeList[index]['id'];
      const currentData = {
        index,
        id,
        title: title,
        amount: +amount,
        edit: "incomeList"
      };

      this.sendEditValue.next(currentData);
    }

    updateIncome(index: number) {
      let value = this.incomeList[index].amount;
      // calculate Budget
      this.updateBudget(+value, 'minus');
      // send budget
      this.sendBudgetValue.next(this.budget);
      // update income List
      this.incomeList.splice(index, 1);
      // send updated income list
      this.sendIncomeList.next(this.incomeList);
    }

    addExpense(title: string, amount: number, editMode: Object){
      if(editMode['status'] === false){
        let id = this.getCurrentId(this.expenseList);
        this.expenseList.push({
            id: ++id,
            title: title,
            amount: +amount
        });
        // update expense list
        this.sendExpenseList.next(this.expenseList);
        // calculation of budget
        this.updateBudget(+amount, 'minus');
        // send budget 
        this.sendBudgetValue.next(this.budget);

      } else if(editMode['status'] === true){
        this.expenseList[editMode['index']]['title'] = title;
        this.expenseList[editMode['index']]['amount'] = amount;
      
        if(amount > editMode['amount']){
          let updatedAmt = amount - editMode['amount'];
          this.updateBudget(updatedAmt, "minus");
          
        } else if(amount < editMode['amount']) {
          let updatedAmt = editMode['amount'] - amount;
          this.updateBudget(updatedAmt, "add");
        }

        this.sendBudgetValue.next(this.budget);

        this.sendExpenseList.next(this.expenseList);
      }
      
    }

    editExpense(index: number){
      const amount = this.expenseList[index]['amount'];
      const title = this.expenseList[index]['title'];
      const id = this.expenseList[index]['id'];
      const currentData = {
        index,
        id,
        title: title,
        amount: +amount,
        edit: "expenseList"
      };

      this.sendEditValue.next(currentData);
    }

    updateExpense(index: number){
      let value = this.expenseList[index].amount;
      // calculation of budget
      this.updateBudget(+value, 'add');
      // send budget
      this.sendBudgetValue.next(this.budget);
      // update expense list
      this.expenseList.splice(index,1);
      // send updated expense list
      this.sendExpenseList.next(this.expenseList);
    }

    updateBudget(value: number, operation: string){
        if(operation === 'add'){
          this.budget = this.budget + value;
        } else if(operation === 'minus'){
          this.budget = this.budget - value;
        }
    }

    getCurrentId(array: any){
      if(array.length > 0){
        return array[(array.length)-1].id;
      } else {
        return 0;
      }
    }  

    getServerData(){
      this.httpClient.get(this.url + 'data.json')
      .subscribe(
        (data) => {
          if(data){
            this.incomeList = data['incomeList'];
            this.expenseList = data['expenseList'];
            this.budget = data['budget'];
  
            this.sendBudgetValue.next(this.budget);
            this.sendIncomeList.next(this.incomeList);
            this.sendExpenseList.next(this.expenseList);
          } else {
            this.alertObservable.next({ message: 'Error: Data Fetching Failed', show: true, class: 'alert-danger'})
          }
          
        }, (err: Error) => {
          console.log(err);
          this.alertObservable.next({ message: "Error: Failed to Fetch Data", show: true, class: 'alert-danger'})
        }
      );
    }
    
    updateServerData(){
      this.dataObject = {
        budget: this.budget,
        incomeList: this.incomeList,
        expenseList: this.expenseList
      }

      this.httpClient.put(this.url + 'data.json', this.dataObject)
        .subscribe(
          (data)=>{
            console.log(data);
            this.alertObservable.next({message: "Success: Successfully Updated Data!", show: true, class:"alert-success"})

          },
          (error: Error)=>{
            let msg = 'Error: Failed to update data! ';

            if(error['status'] === 401){
              msg += 'Admin has probably restricted write permission in firebase rules'  
            }
            this.alertObservable.next({message: msg, show: true, class:"alert-danger"})
          }
        );
    }
}
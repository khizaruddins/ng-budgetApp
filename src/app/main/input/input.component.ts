import { Component, OnInit, ViewChild } from '@angular/core';
import { UpdateValueService } from '../../shared/updateValue.service';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  constructor(private updateValues: UpdateValueService) { }
  title: string = '';
  amount: number = null;
  selected = "add";
  @ViewChild('f') signupForm: NgForm;
  editMode: any = {
    status: false
  };

  editWhat: string;
  index: number = null;

  ngOnInit() { 
    this.updateValues.getServerData();
    this.updateValues.sendEditValue
      .subscribe(
        (data: any) =>{
          this.signupForm.form.patchValue({
            title: data.title,
            amount: data.amount
          });
          this.editMode.index = data.index;
          this.editMode.title = data.title;
          this.editMode.amount = data.amount;
          this.editMode.status = true;
          this.editMode.edit = data.edit;
          this.editMode.id = data.id;
        }
      )
  }

  onSubmit(form: NgForm){
    if (this.editMode.status === true){
      if(this.editMode.edit === "incomeList"){
        this.updateValues.addIncome(form.value.title, +form.value.amount, this.editMode);
        form.reset();
        this.editMode.status = false;
      } else if(this.editMode.edit === 'expenseList'){
        this.updateValues.addExpense(form.value.title, +form.value.amount, this.editMode);
        form.reset();
        this.editMode.status = false;
      }
    } else if(this.editMode.status === false){
      if(form.value.operation === "add"){
        this.updateValues.addIncome(form.value.title, +form.value.amount, this.editMode);
        form.reset();
      }
      if(form.value.operation === "remove"){
        this.updateValues.addExpense(form.value.title, +form.value.amount, this.editMode);
        form.reset();
      } 
    }
  }
}

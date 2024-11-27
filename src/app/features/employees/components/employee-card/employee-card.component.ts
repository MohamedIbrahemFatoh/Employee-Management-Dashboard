import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListDetails } from '../../classes/EmployeessList';
@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent {

  @Input() employeeDetails:ListDetails;
  @Input() loading:boolean = false;
  @Output() DeleteEmployee = new EventEmitter<ListDetails>();
  @Output() EditEmployee = new EventEmitter<ListDetails>();


  deleteEmployee() {
    this.DeleteEmployee.emit(this.employeeDetails);
  }

  editEmployee() {
    this.EditEmployee.emit(this.employeeDetails);
  }
}

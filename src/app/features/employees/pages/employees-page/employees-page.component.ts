import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormComponent } from '../../components/employee-form/employee-form.component';
import { ListDetails, ListFilter } from '../../classes/EmployeessList';

@Component({
  selector: 'app-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.scss']
})
export class EmployeesPageComponent implements OnInit {

  employeesList:ListDetails[] = [];
  dataLoading: boolean = false;

  // table
  totalCount = 0;
  pageIndex = 0;
  filterModel: ListFilter = new ListFilter();

  constructor(
    private employeesService: EmployeesService,
    private toastr: ToastrService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.filterModel.per_page = 6;
    this.getEmployeesList();
  }

  getEmployeesList(event = null){
    this.dataLoading = true;
    if (event) {
      this.pageIndex = event.pageIndex + 1;
      this.filterModel.page_number = this.pageIndex;
      this.filterModel.per_page = event.pageSize;
    } else {
      this.filterModel.page_number = 1;
    }

    this.employeesService.getEmployeesList(this.filterModel).subscribe(
      (data) => {
        this.dataLoading = false;
        this.employeesList = data.data;
        this.totalCount = data.total;
        this.pageIndex = this.pageIndex - 1;
      },
      (err) => {
        this.dataLoading = false;
        this.showError('Error');
      }
    );
  }


  editEmployee(e){
    this.openEmployeeForm(e);
  }

  deleteEmployee(e) {
    this.dataLoading = true;
    this.employeesService.deleteEmployee(e.id).subscribe(
      () => {
        this.dataLoading = false;
        this.showSuccess('Employee Deleted Successfully');
        this.employeesList = this.employeesList.filter(
          (item) => {
            return item.id !== e.id;
          }
        );
        this.totalCount-= 1;
      },
      (err) => {
        this.dataLoading = false;
        
      }
    );
  }

  openEmployeeForm(employeeData = null) {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '600px',
      data: employeeData,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        
        if(employeeData) {
          this.employeesList.forEach(element => {
            if(element.id === result.id) {
              element.first_name = result.first_name;
              element.last_name = result.last_name;
              element.email = result.email;
            }            
          });
        } else {
          this.employeesList.unshift(result)
        }
      }
    });
  }

  showError(msg) {
    this.toastr.error(msg);
  }

  showSuccess(msg) {
    this.toastr.success(msg);
  }
}

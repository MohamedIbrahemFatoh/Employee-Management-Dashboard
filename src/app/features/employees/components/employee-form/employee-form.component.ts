import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import { EmployeesService } from '../../services/employees.service';
import { ListDetails } from '../../classes/EmployeessList';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  loading = false;
  editMode = false;
  isSubmitted = false;
  employeeForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ListDetails, 
    public dialogRef: MatDialogRef<EmployeeFormComponent>,
    private formBuilder: FormBuilder,
    private employeesService: EmployeesService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.formInit();
    if (this.data) {
      this.editMode = true;
      this.employeeForm.patchValue(this.data)
    }
  }

  getTitle() {
    if(this.editMode) {
      return 'Edit Employee';
    } else {
      return 'Add Employee';
    }
  }

  formInit() {
    this.employeeForm = this.formBuilder.group({
      first_name: [
        '', 
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z ]+$'),
        ]
      ],
      last_name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z ]+$'),
        ] 
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '[a-zA-Z0-9._-]{1,}@[a-zA-Z0-9.-]{2,}[.]{1}[a-zA-Z]{2,}'
          ),
        ] 
      ],
      contactInfo: this.formBuilder.array([
        this.formBuilder.group({
          phoneNumber: [null],
        }),
      ]),
    });
  }

  get contactInfo() {
    return this.employeeForm.controls.contactInfo as FormArray;
  }

  addItem($el = null) {
    this.contactInfo.push(
      this.formBuilder.group({
        phoneNumber: [$el ? $el.phoneNumber : null, Validators.required],
      })
    );
  }
  removeItem($index: number) {
    this.contactInfo.removeAt($index);
  }

  hasError(controlName: string, errorName: string) {
    return this.employeeForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    this.employeeForm.markAllAsTouched();
    if(this.employeeForm.valid) {
      this.loading = true;
      this.employeesService.submitEmployee(this.data?.id, this.employeeForm.value, this.editMode).subscribe(
        (result) => {
          this.loading = false;
          this.showSuccess(this.editMode? 'Employee Info Changed Successfully': 'Employee Added Successfully');  
          if(this.data) {
            result.id = this.data.id;
            result.avatar = this.data.avatar;
          }                
          this.dialogRef.close(result);
        },
        (err) => {
          this.loading = false;
          this.showError('Employee Not Submitted');
        }
      );
    }
  }

  showError(msg) {
    this.toastr.error(msg);
  }

  showSuccess(msg) {
    this.toastr.success(msg);
  }
}

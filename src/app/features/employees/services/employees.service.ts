import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(private http:HttpClient) {}

  getEmployeesList(ListFilter): Observable<any> {
    return this.http.get<any>(`https://reqres.in/api/users?page=${ListFilter.page_number}&per_page=${ListFilter.per_page}`);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<any>(`https://reqres.in/api/users/${id}`);
  }

  submitEmployee(id: number, data: any, editMode: boolean = false): Observable<any> {
    return editMode ? this.http.put<any>(`https://reqres.in/api/users/${id}`, data) : this.http.post<any>(`https://reqres.in/api/users`, data);
  }
}

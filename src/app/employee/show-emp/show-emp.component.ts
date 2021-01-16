import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service:SharedService) { }
  EmployeeList: any[];
  ActivateAddEditEmpComp: boolean = false;
  emp: any;
  ModalTitle: string;

  ngOnInit(): void {
    this.refreshEmpList();
  }
  refreshEmpList() {
    this.service.getEmpList().subscribe(data => { this.EmployeeList = data });
  }
  addClick() {
    this.emp = {
      EmployeeId: 0,
      EmployeeName: "",
      Department: "",
      DateOfJoining: "",
      PhotoFileName:"anonymous.png"
    }
    this.ModalTitle = "Add Employee"
    this.ActivateAddEditEmpComp = true;
  }
  editClick(item: any) {
    this.emp = item;
    this.ModalTitle = "Edit Employee";
    this.ActivateAddEditEmpComp = true;
  }
  closeClick() {
    this.ActivateAddEditEmpComp = false;
    this.refreshEmpList();
  }
  deleteClick(item) {
    if (confirm('Are you sure?')) {
      this.service.deleteEmployee(item.EmployeeId).subscribe(data => {
        alert(data.toString());
        this.refreshEmpList();
      })
    };
  }

}

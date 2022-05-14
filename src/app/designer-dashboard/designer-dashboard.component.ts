import { Component, OnInit } from '@angular/core';
import { BaseapiService } from '../services/baseapi.service';
import { FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-designer-dashboard',
  templateUrl: './designer-dashboard.component.html',
  styleUrls: ['./designer-dashboard.component.scss']
})

export class DesignerDashboardComponent implements OnInit {

  layout_data:any;
  ccm_data:any;
  scm_data:any;
  sizing_data:any;
  baseCategory:any;
  customer_id:any;
  size:any;
  scm:any;
  cabinet_sizing:any;
  custid: any;
  layout:any; 
  showtable:any;
  add_form_data:any;
  view_form_data:any;
  delete_form_data:any;
  showMsg: boolean = false;
  showErrMsg: boolean = false;
  showDelMsg: boolean = false;

  constructor(private baseapi:BaseapiService, private fb: FormBuilder) {}

  form = this.fb.group({
    customer_id: ["", [Validators.required]],
    layout_selected: [ "", [Validators.required]],
    ccm_selected: ["", [Validators.required]],
    size_selected: ["", [Validators.required]],
    scm_selected: ["", [Validators.required]]
  });

  ngOnInit(): void {

    this.baseapi.getDataLayout().subscribe((data:any) => {
      console.log('res-Layout',data);
      this.layout_data = data;
    });
    this.baseapi.getDataCCM().subscribe((data:any) => {
      console.log('res-ccm',data);
      this.ccm_data = data;
    });

  }
  get formcontrols(){
    return this.form.controls;
  }
  selectedValue(obj:any){
    let sendreq= {
      baseCategory: obj
    }
    console.log('sendreq',sendreq);
    this.baseapi.updateSizing(sendreq).subscribe((data:any) => {
      console.log('ressizing',data);
      this.cabinet_sizing = data;
    });
    this.form.controls['size_selected'].enable();
    this.form.controls['scm_selected'].enable();
    this.baseapi.getDataSCM(sendreq).subscribe((data:any) => {
     console.log('res-scm',data);
       this.scm_data = data;
     });
  }
  enablingLayout(e:any){
    console.log(e.target.value);
      if(e) {
         this.form.controls['layout_selected'].enable();
       }
  }
  
  add(form: any){
    if (this.form !== null && this.form !== undefined) {
    console.log('addData',form);
    this.baseapi.add_data(form).subscribe((data:any) => {
      console.log('dataAdded', JSON.stringify(data));
      this.add_form_data = data;
      this.showMsg = true;
      this.showErrMsg = false;
      this.showDelMsg = false;
    });
  }
  else {
    this.showErrMsg = true;
    this.showMsg = false;
  }
  }

  view(id:any){
    let viewd= {
      customer_id: id
    }
      console.log('customer_id in view',viewd.customer_id);
    this.baseapi.view_data(viewd).subscribe((data:any) => {
      console.log('view res', JSON.stringify(data));
      this.view_form_data = data;
      console.log("view",this.view_form_data);
    });
    this.showMsg = false;
    this.showErrMsg = false;
    this.showDelMsg = false;
    this.showtable = true;
    this.showDelMsg = false;
  }

  delete(id:any){
    let sendreq= {
      id: id
    }
    this.baseapi.delete_row(sendreq).subscribe((data:any) => {
      console.log('delete', data, sendreq);
      this.delete_form_data = data;
    });
    for(let i = 0; i < this.view_form_data.length; ++i){
      if (this.view_form_data[i].id === id) {
          this.view_form_data.splice(i,1);
      }
  }
    this.showDelMsg = true;
  }

  submit(e:any){
    console.log("submit",e.form);
    console.log("submit value",this.form.value)
  }
}

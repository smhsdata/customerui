import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseapiService {

  private url_layout = 'http://54.157.42.90:8010/getLayout';
  private url_ccm = 'http://54.157.42.90:8010/getCCM';
  private url_sizing = 'http://54.157.42.90:8010/getSize';
  private url_scm = 'http://54.157.42.90:8010/getSCMForCustomer';
  private url_add = 'http://54.157.42.90:8010/setIntermediateData';
  private url_view = 'http://54.157.42.90:8010/getIntermediateData';
  private url_delete = 'http://54.157.42.90:8010/deleteIntermediateData';

  //private url_layout = 'http://localhost:3000/getLayout';
  //private url_ccm = 'http://localhost:3000/getCCM';
  //private url_sizing = 'http://localhost:3000/getSizing';
  //private url_scm = 'http://localhost:3000/getSCM';

  constructor(private httpClient: HttpClient) {}

getDataLayout() {
  return this.httpClient.get<any>(this.url_layout);
}
getDataCCM() {
  return this.httpClient.get<any>(this.url_ccm);
}
getDataSizing() {
  return this.httpClient.get<any>(this.url_sizing);
}
getDataSCM(post:any) {
  return this.httpClient.post<any>(this.url_scm,post);
}
updateSizing(post:any){
  return this.httpClient.post<any>(this.url_sizing,post);
}
add_data(post:any){
  return this.httpClient.post<any>(this.url_add,post);
}
view_data(post:any){
  return this.httpClient.post<any>(this.url_view,post).pipe(map(res => res.output));
}
delete_row(post:any){
  return this.httpClient.post<any>(this.url_delete,post);
}
}

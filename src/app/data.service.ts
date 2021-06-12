import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { partitionArray } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  status: string;
  postId: any

  constructor(private httpClient: HttpClient) { }


  getPay(db: String)
  {
    return this.httpClient.get(`http://localhost:3000/getInfoTabla?db=${db}&tabla=PAY`)
  }

  getASG(db: String)
  {
    return this.httpClient.get(`http://localhost:3000/getInfoTabla?db=${db}&tabla=ASG`)
  }

  getProj(db: String)
  {
    return this.httpClient.get(`http://localhost:3000/getInfoTabla?db=${db}&tabla=PROJ`)
  }

  getEmp(db: String)
  {
    return this.httpClient.get(`http://localhost:3000/getInfoTabla?db=${db}&tabla=EMP`)
  }

  deleteField(db: number, query: String)
  {
    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    const body = { db: db, data: query};
    this.httpClient.post<any>(`http://localhost:3000/deleteInfoTabla`, body, { headers }).subscribe(data => {
        this.postId = data.id;
    });
  }

  postDato(db: number, query: String)
  {
    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    const body = { db: db, data: query};
    this.httpClient.post<any>(`http://localhost:3000/insertInfoTabla`, body, { headers }).subscribe(data => {
        this.postId = data.id;
    });
  }

  updateDato(db: number, query: String)
  {
    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    const body = { db: db, data: query};
    this.httpClient.put<any>(`http://localhost:3000/updateInfoTabla`, body, { headers }).subscribe(data => {
        this.postId = data.id;
    });
  }

}

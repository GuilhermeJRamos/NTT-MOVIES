import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class OmdbService {
  
  constructor(private http: HttpClient) { }

  getData(input: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/?s=${input}&apikey=${environment.apiKey}&language=pt-BR`);
  }

  getDataDetails(id: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/?i=${id}&apikey=${environment.apiKey}&language=pt-BR`);
  }
}

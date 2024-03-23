import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development'; 

@Injectable({
  providedIn: 'root'
})
export class OmdbService {
  
  constructor(private http: HttpClient) { }

  getData(input: string): Observable<any> {
    return this.http.get(`${environment.API_URL}/?s=${input}&API_KEY=${environment.API_KEY}&language=pt-BR`);
  }

  getDataDetails(id: any): Observable<any> {
    return this.http.get(`${environment.API_URL}/?i=${id}&API_KEY=${environment.API_KEY}&language=pt-BR`);
  }
}

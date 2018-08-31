import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getSideContent() {
    return this.http.get('./assets/sidelist.json');
  }

  getDataById(id) {
    return this.http.get('./assets/sidelist.json').pipe(
      map((res: any[]) => {
        return res.filter(res => res['id'] === id);
      }, error => error));
  }

  getChatData(id) {
    return this.http.get('./assets/chatlist.json').pipe(
      map((res: any[]) => {
        return res.filter(res => res['id'] === id);
      }, error => error));
  }
}

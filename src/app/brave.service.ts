import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BraveService {

  constructor(
    private http: HttpClient
  ) {
  }

  isMock = false;
  url = 'http://localhost:5000';

  search(query: string) {
    if (this.isMock) {
      return this.http.get('assets/fooresponse.json');
    }
    return this.http.get(`${this.url}/search?q=${query}`);
  }
}

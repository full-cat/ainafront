import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AiService {

  constructor(
    private  http: HttpClient
  ) { }

  queryChatbot(query: string) {
    return this.http.get('http://localhost:5000/chatbot?sentence=' + query);
  }
}

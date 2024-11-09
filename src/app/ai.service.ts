import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

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

  querySound(blob: Blob) {
    const formData = new FormData();
    const audioFile = new File([blob], 'audio.webm', { type: 'audio/webm' });
    formData.append('audio', audioFile);

    return this.http.post('http://localhost:5000/speech_recognition', formData);
  }
}

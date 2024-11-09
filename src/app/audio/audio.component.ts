import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {WaveFile} from "wavefile";
import {IonicModule} from "@ionic/angular";
import {AiService} from "../ai.service";
import {BraveService} from "../brave.service";
import {forkJoin} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
  imports: [
    NgIf,
    IonicModule
  ],
  standalone: true
})
export class AudioComponent implements OnInit {

  mediaRecorder: MediaRecorder | undefined;
  private audioChunks: Blob[] = [];

  //emitter to send the searchQuery to the parent component
  @Output() searchQueryEmitter = new EventEmitter<string>();


  constructor(
    private aiService: AiService,
    private braveService: BraveService,
    private router: Router
  ) {
  }

  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({audio: true});
      this.mediaRecorder = new MediaRecorder(stream, {mimeType: 'audio/webm'});

      this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
        this.audioChunks.push(event.data);
      };

      this.audioChunks = [];
      this.mediaRecorder.start();
    } catch (error) {
      console.error('Error al acceder al micrófono:', error);
    }
  }

  async stopRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();

      this.mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(this.audioChunks, {type: 'audio/webm'});
        const arrayBuffer = await audioBlob.arrayBuffer();

        //download audioblob
        const downloadUrl = URL.createObjectURL(audioBlob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'grabacion.webm';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(downloadUrl); // Libera el objeto URL

        this.aiService.querySound(audioBlob).subscribe((response: any) => {
            response = response['response']
            console.log('Audio response:', response);
            let x2 = this.braveService.search(response);
            let x1 = this.aiService.queryChatbot(response);
            forkJoin([x1, x2]).subscribe(results => {
              console.log('Búsqueda realizada:', response);
              console.log('Resultados:', results[1]);
              console.log('Chatbot:', results[0]);
              this.router.navigate(['/results'], {state: {data: results[1], chatbot: results[0], query: response}});

            });
          }
        );
      };
    }
  }

  ngOnInit(): void {
  }

}

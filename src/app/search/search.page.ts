import {Component} from '@angular/core';
import {BraveService} from "../brave.service";
import {Router} from "@angular/router";
import {AiService} from "../ai.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {
  searchQuery: string = '';

  constructor(private braveService: BraveService,
              private aiService: AiService,
              private router: Router) {
  }

  onSearch() {
    let x1 = this.aiService.queryChatbot(this.searchQuery);
    let x2 = this.braveService.search(this.searchQuery);

    // after 2 requests are done
    forkJoin([x1, x2]).subscribe(results => {
      // console.log('Búsqueda realizada:', this.searchQuery);
      // console.log('Resultados:', results[0]);
      // console.log('Chatbot:', results[1]);
      this.router.navigate(['/results'], {state: {data: results[1], chatbot: results[0], query: this.searchQuery}});
    });
    // this.braveService.search(this.searchQuery).subscribe((response: any) => {
    //     console.log('Búsqueda realizada:', this.searchQuery);
    //     console.log('Resultados:', response);
    //     this.router.navigate(['/results'], {state: {data: response}});
    //   }
    // );

  }

  onVoiceSearch() {

  }
}

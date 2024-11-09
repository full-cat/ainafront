import {Component} from '@angular/core';
import {BraveService} from "../brave.service";
import {AiService} from "../ai.service";

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage {
  searchQuery: string = '';
  searchResults: any[] = [];
  chatbotResponse = ''

  constructor(
    private searchService: BraveService,
    private aiService: AiService
  ) {
  }

  ngOnInit() {
    const extras = history.state;
    if (extras && extras.data) {
      this.parseResults(extras.data);
      this.limitResults()
      this.searchQuery = extras.query;
      this.chatbotResponse = extras.chatbot["response"];
    }
  }

  onSearch() {
    this.searchService.search(this.searchQuery).subscribe((response: any) => {
      this.parseResults(response);
      this.limitResults()

    });
    this.aiService.queryChatbot(this.searchQuery).subscribe((response: any) => {
        this.chatbotResponse = response["response"];
      }
    );


  }

  openResult(url: string) {
    window.open(url, '_blank');
  }

  parseResults(data: any) {
    this.searchResults = data.web.results.map((result: any) => {
      return {
        title: result.title,
        description: result.description,
        url: result.url
      };
    });
  }

  limitResults() {
    this.searchResults = this.searchResults.slice(0, 10);
  }

  onRetry() {
    this.aiService.queryChatbot(this.searchQuery).subscribe((response: any) => {
        this.chatbotResponse = response["response"];
      }
    );
  }
}

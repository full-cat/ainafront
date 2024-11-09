import {Component} from '@angular/core';
import {BraveService} from "../brave.service";

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage {
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(
    private searchService: BraveService,
  ) {
  }

  ngOnInit() {
    const extras = history.state;
    if (extras && extras.data) {
      // load searchResults from extras.data
      this.parseResults(extras.data);
      this.limitResults()
    }
  }

  onSearch() {
    this.searchService.search(this.searchQuery).subscribe((response: any) => {
      console.log('Búsqueda realizada:', this.searchQuery);
      console.log('Resultados:', response);

      this.parseResults(response);
      this.limitResults()

      // add ++++ to all titles
      this.searchResults = this.searchResults.map((result: any) => {
        return {
          ...result,
          title: '++++' + result.title
        };
      });

    });


  }

  openResult(url: string) {
    window.open(url, '_blank');
  }

  parseResults(data: any) {
    this.searchResults = data.web.results.map((result: any) => {
      return {
        title: result.title,
        description: result.description,
        url: "http://localhost:5000/proxy?url=" + result.url
      };
    });
  }

  limitResults() {
    this.searchResults = this.searchResults.slice(0, 10);
  }
}

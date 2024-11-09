import {Component} from '@angular/core';
import {BraveService} from "../brave.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {
  searchQuery: string = '';

  constructor(private braveService: BraveService,
              private router: Router) {
  }

  onSearch() {
    this.braveService.search(this.searchQuery).subscribe((response: any) => {
        console.log('Búsqueda realizada:', this.searchQuery);
        console.log('Resultados:', response);
        this.router.navigate(['/results'], {state: {data: response}});
      }
    );

  }
}

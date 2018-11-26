import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Link} from '../../class/link';
import {Observable} from 'rxjs/Observable';
import {SearchService} from '../../service/search.service';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-search-component',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService]
})
export class SearchComponent implements AfterViewInit {

 @ViewChild('searchInput') readonly search: ElementRef;
 readonly title = 'Hooli search';

  constructor(
    readonly searchService: SearchService
  ) {}

  ngAfterViewInit() {
      Observable.fromEvent( this.search.nativeElement, 'keyup')
        .debounce( (value: any) => {
          if (value.key === 'Enter') {
            return Observable.interval(0);
          }
          return Observable.interval(1000);
        })
        .map( value => value.target.value)
        .subscribe((str) => {
          this.searchService.list(str);
      });
  }

  sort(links: Link[], fieldName: string) {
    links.sort((a, b) => {
          if (a[fieldName] > b[fieldName]) {
            return 1;
          }
          if (a[fieldName] < b[fieldName]) {
            return -1;
          }
          return 0;
        });
  }

}


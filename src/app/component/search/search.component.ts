import {Component} from '@angular/core';
import {Link} from '../../class/link';
import {SearchService} from '../../service/search.service';
import {Subject} from 'rxjs/Subject';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

@Component({
  selector: 'app-search-component',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService]
})

export class SearchComponent {

 readonly title = 'Hooli search';
 readonly searchLinks = new Subject<string>();

 /** ввод в строке поиска, получаем список ссылок*/
 readonly links$ = this.searchLinks.pipe(
                            debounceTime(1000),
                            distinctUntilChanged(),
                            switchMap((searchText: string) => {
                              return this.searchService.list(searchText);
                            }),
                          );

 constructor(
    readonly searchService: SearchService
  ) {}

/** обрабатываем клик на кнопки сортировки ссылок*/
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


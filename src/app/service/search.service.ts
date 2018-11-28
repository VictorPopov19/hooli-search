import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Link} from '../class/link';
import {of} from 'rxjs/observable/of';
import {catchError, map, delay} from 'rxjs/operators';

@Injectable()

export class SearchService {

  URL = 'http://localhost:4200/assets/db.json';
  private counter = 0;
  isLoaded = true;


  constructor(
    private httpClient: HttpClient
  ) {}

  /** searchStr - строка поиска
      возвращает запрос к серверу, который должен вернуть список найденных ссылок,
      или объект {error: string} c текстом ошибки
  */
  public list (searchStr?: string): Observable<Link[] | { error: string}> {
       this.counter++;
       this.isLoaded = false;
       return this.httpClient.get(this.URL)
         .pipe(
          delay(1000),
          map((links:  Link[]) => {
            this.isLoaded = true;
            if (this.counter % 3 === 0) {
              throw new Error('Server not responding');
            }
             if (searchStr === '' || searchStr === undefined) {
               return links;
             }
             return links
               .filter((link) => {
                return (link.title.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1) ||
                       (link.description.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1);
                });
          }),
          catchError(error => {
            this.isLoaded = true;
            return of({error: error.message});
          }),

       );
  }

}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/delay';
import {Link} from '../class/link';

@Injectable()

export class SearchService {

  URL = 'http://localhost:4200/assets/db.json';
  private subjectLinks = new Subject();
  private subjectError = new Subject();
  private counter = 0;
  isLoaded = true;


  constructor(
    private httpClient: HttpClient
  ) {}

  public list (searchStr: string): void {
       this.counter++;
       this.isLoaded = false;
       this.httpClient.get(this.URL)
          .delay(1000)
          .map((links: Link[] ) => {
            this.isLoaded = true;
            if (this.counter % 3 === 0) {
              throw new Error('Server not responding');
            }
            return links;
          })
          .map((links:  Link[]) => {
             if (searchStr === '' || searchStr === undefined) {
               return links;
             }
             return links.filter((link) => {
                return (link.title.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1) ||
                       (link.description.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1);
                });
          })
          .subscribe(
            (links:  Link[]) => {
                    this.setLinks(links);
                    this.setErrors(null);

                  },
            (error: Error) => {
                    this.setErrors(error.message);
            }
          );
  }

  public setErrors(str: string): void {
    this.subjectError
      .next(str);
  }

   public getErrors(): Observable<any> {
    return this.subjectError;
  }

  public getLinks(): Observable<any> {
    return this.subjectLinks;
  }

  public setLinks(links: Link[]): void {
          this.subjectLinks
           .next(links);
  }

}

import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient} from '@angular/common/http';
import { baseURL } from '../shared/serverconfig';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  
  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions');
    // return of(PROMOTIONS).pipe(delay(2000));
    // return this.http.get<Leader[]>(baseURL + 'leaders');
  }
  
  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions/id')
    .pipe(map(promotion => promotion[0]));
    // return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
  }
  
  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions?featured=true')
    .pipe(map(promotion => promotion[0]));
    // return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
  }

  constructor(private http: HttpClient) { }
}

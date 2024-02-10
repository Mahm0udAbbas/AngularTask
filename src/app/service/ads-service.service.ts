import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdsServiceService {
  ads: string[];
  constructor() {
    this.ads = [
      './assets/images/upto50.webp',
      './assets/images/blackfriday.png',
      './assets/images/special.jpg',
    ];
  }

  getAllAds() {
    return new Observable<string>((supscriber) => {
      let i = 0;
      let adsInterval = setInterval(() => {
        if (i == this.ads.length) {
          supscriber.complete();
        }
        if (this.ads[i] == '') {
          supscriber.error();
        }
        supscriber.next(this.ads[i]);
        i++;
      }, 2000);
      return {
        unsubscribe: () => {
          clearInterval(adsInterval);
        },
      };
    });
  }
}

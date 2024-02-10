import { Component, OnInit } from '@angular/core';
import { AdsServiceService } from '../../service/ads-service.service';
import { NgFor } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ads',
  standalone: true,
  imports: [NgFor],
  templateUrl: './ads.component.html',
  styleUrl: './ads.component.css',
})
export class AdsComponent implements OnInit {
  data: string[];
  adSubscription!: Subscription;
  constructor(private adsService: AdsServiceService) {
    this.data = [];
  }
  ngOnInit() {
    this.adSubscription = this.adsService.getAllAds().subscribe({
      next: (_data) => {
        // console.log(_data);
        this.data.push(_data);
      },
      error: (err) => {
        alert(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  ngOnDestroy() {
    this.adSubscription.unsubscribe();
  }
}

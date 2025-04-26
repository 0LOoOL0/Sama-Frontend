import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-providerpromotion',
  templateUrl: './providerpromotion.page.html',
  styleUrls: ['./providerpromotion.page.scss'],
})
export class ProviderpromotionPage implements OnInit {

  segmentModel: 'promo' | 'coupon' = 'promo';

  promoDescriptions: { [key: string]: string } = {
    promo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt pharetra eu eleifend.',
    coupon: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt pharetra eu eleifend.'
  };

  promotions: { [key: string]: { title: string, price: string, details: string[] }[] } = {
    promo: [
      {
        title: 'Gold Promotion',
        price: 'AED 100',
        details: [
          'Fastest way to sell your car',
          'Sell at good price',
          'Secure and safe'
        ]
      },
      {
        title: 'Premium Promotion',
        price: 'AED 200',
        details: [
          'Can manage your ad',
          'Receive messages from buyers',
          'Lorem ipsum'
        ]
      }
    ],
    coupon: [
      {
        title: 'Ready-to-Launch Promotion',
        price: 'BHD 20',
        details: [
          'Reach more potential customers',
          'Cheap and affordable',
          'Secure and safe'
        ]
      },
      {
        title: 'Custom Ad Design Promotion',
        price: 'BHD 20',
        details: [
          'Fully customized ads to match your brand identity',
          'Cheap and affordable',
          'Boost visibility and drive more sales for your business'
        ]
      }
    ]
  };

  constructor() { }

  ngOnInit() { }
}

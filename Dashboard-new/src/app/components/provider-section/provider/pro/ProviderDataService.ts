import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root' // very important! Service should be singleton
})
export class ProviderDataService {
    private providerData: any = null;

    setProviderData(data: any) {
        this.providerData = data;
        localStorage.setItem('providerData', JSON.stringify(data));
      }
      
      getProviderData() {
        if (!this.providerData) {
          const stored = localStorage.getItem('providerData');
          if (stored) {
            this.providerData = JSON.parse(stored);
          }
        }
        return this.providerData;
      }
      
}

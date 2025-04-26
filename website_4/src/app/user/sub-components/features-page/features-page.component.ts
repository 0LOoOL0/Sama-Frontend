import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-features-page',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './features-page.component.html',
  styleUrls: ['./features-page.component.css',
    './custom-style.css', './style.css', './resposiveness.css']
})
export class FeaturesPageComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    this.featureMobileToggle();
  }

  featureMobileToggle(): void {
    let mobileCard: NodeListOf<Element> = document.querySelectorAll(".featureMobileCol");
    let mobileShow: Element | null = document.querySelector('.featureShowMobileCo');

    mobileCard.forEach((item: Element) => {
        item.addEventListener("click", () => {
            if (mobileShow) {
                mobileShow.classList.toggle("show");
            }
        });
    });

    if (mobileShow) {
        mobileShow.addEventListener("click", () => {
            mobileShow.classList.toggle("show");
        });
    }
}
}

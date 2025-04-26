import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
})
export class LanguagePage implements OnInit {

  constructor(public translate: TranslateService, private router: Router) {
    // Set default language
    this.translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang() || 'en';
    this.translate.use(browserLang.match(/en|ar/) ? browserLang : 'en');
  }

  switchLanguage(lang: string) {
    // Set the language
    this.translate.use(lang);
    // Navigate to the desired route (update '/adv' as needed)
    this.router.navigate(['/adv']);
  }

  ngOnInit() {
  }

}

import { browser, by, element } from 'protractor';
import { exit } from 'process';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getPageTitle() {
    return browser.getTitle();
  }

  getAllAnchors() {
    return element.all(by.tagName('a'));
  }
}

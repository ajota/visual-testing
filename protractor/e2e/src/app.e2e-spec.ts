import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('The initial page App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display the appropiate elements', () => {
    page.navigateTo();
    expect(page.getPageTitle()).toEqual('CredinetPersonasFrontWebPortal');
    expect(page.getAllAnchors().count()).toEqual(2);
  });

  it('should display the appropiate elements', () => {
    page.navigateTo();
    expect(page.getPageTitle()).toEqual('CredinetPersonasFrontWebPortal');
    expect(page.getAllAnchors().count()).toEqual(2);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

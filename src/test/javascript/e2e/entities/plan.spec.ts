import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Plan e2e test', () => {

    let navBarPage: NavBarPage;
    let planDialogPage: PlanDialogPage;
    let planComponentsPage: PlanComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Plans', () => {
        navBarPage.goToEntity('plan');
        planComponentsPage = new PlanComponentsPage();
        expect(planComponentsPage.getTitle())
            .toMatch(/Plans/);

    });

    it('should load create Plan dialog', () => {
        planComponentsPage.clickOnCreateButton();
        planDialogPage = new PlanDialogPage();
        expect(planDialogPage.getModalTitle())
            .toMatch(/Create or edit a Plan/);
        planDialogPage.close();
    });

    it('should create and save Plans', () => {
        planComponentsPage.clickOnCreateButton();
        planDialogPage.setNameInput('name');
        expect(planDialogPage.getNameInput()).toMatch('name');
        planDialogPage.setBasePriceInput('5');
        expect(planDialogPage.getBasePriceInput()).toMatch('5');
        planDialogPage.setDiscountInput('5');
        expect(planDialogPage.getDiscountInput()).toMatch('5');
        planDialogPage.save();
        expect(planDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PlanComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-plan div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class PlanDialogPage {
    modalTitle = element(by.css('h4#myPlanLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    basePriceInput = element(by.css('input#field_basePrice'));
    discountInput = element(by.css('input#field_discount'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setBasePriceInput = function(basePrice) {
        this.basePriceInput.sendKeys(basePrice);
    };

    getBasePriceInput = function() {
        return this.basePriceInput.getAttribute('value');
    };

    setDiscountInput = function(discount) {
        this.discountInput.sendKeys(discount);
    };

    getDiscountInput = function() {
        return this.discountInput.getAttribute('value');
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}

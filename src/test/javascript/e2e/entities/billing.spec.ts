import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Billing e2e test', () => {

    let navBarPage: NavBarPage;
    let billingDialogPage: BillingDialogPage;
    let billingComponentsPage: BillingComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Billings', () => {
        navBarPage.goToEntity('billing');
        billingComponentsPage = new BillingComponentsPage();
        expect(billingComponentsPage.getTitle())
            .toMatch(/Billings/);

    });

    it('should load create Billing dialog', () => {
        billingComponentsPage.clickOnCreateButton();
        billingDialogPage = new BillingDialogPage();
        expect(billingDialogPage.getModalTitle())
            .toMatch(/Create or edit a Billing/);
        billingDialogPage.close();
    });

    it('should create and save Billings', () => {
        billingComponentsPage.clickOnCreateButton();
        billingDialogPage.setNameInput('name');
        expect(billingDialogPage.getNameInput()).toMatch('name');
        billingDialogPage.setDescriptionInput('description');
        expect(billingDialogPage.getDescriptionInput()).toMatch('description');
        billingDialogPage.setCustomerIdInput('5');
        expect(billingDialogPage.getCustomerIdInput()).toMatch('5');
        billingDialogPage.setBillingDateInput('2000-12-31');
        expect(billingDialogPage.getBillingDateInput()).toMatch('2000-12-31');
        billingDialogPage.setQuantityInput('5');
        expect(billingDialogPage.getQuantityInput()).toMatch('5');
        billingDialogPage.setBillingAmountInput('5');
        expect(billingDialogPage.getBillingAmountInput()).toMatch('5');
        billingDialogPage.save();
        expect(billingDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BillingComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-billing div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class BillingDialogPage {
    modalTitle = element(by.css('h4#myBillingLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    descriptionInput = element(by.css('input#field_description'));
    customerIdInput = element(by.css('input#field_customerId'));
    billingDateInput = element(by.css('input#field_billingDate'));
    quantityInput = element(by.css('input#field_quantity'));
    billingAmountInput = element(by.css('input#field_billingAmount'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    };

    setCustomerIdInput = function(customerId) {
        this.customerIdInput.sendKeys(customerId);
    };

    getCustomerIdInput = function() {
        return this.customerIdInput.getAttribute('value');
    };

    setBillingDateInput = function(billingDate) {
        this.billingDateInput.sendKeys(billingDate);
    };

    getBillingDateInput = function() {
        return this.billingDateInput.getAttribute('value');
    };

    setQuantityInput = function(quantity) {
        this.quantityInput.sendKeys(quantity);
    };

    getQuantityInput = function() {
        return this.quantityInput.getAttribute('value');
    };

    setBillingAmountInput = function(billingAmount) {
        this.billingAmountInput.sendKeys(billingAmount);
    };

    getBillingAmountInput = function() {
        return this.billingAmountInput.getAttribute('value');
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

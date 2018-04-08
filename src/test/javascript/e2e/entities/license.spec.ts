import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('License e2e test', () => {

    let navBarPage: NavBarPage;
    let licenseDialogPage: LicenseDialogPage;
    let licenseComponentsPage: LicenseComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Licenses', () => {
        navBarPage.goToEntity('license');
        licenseComponentsPage = new LicenseComponentsPage();
        expect(licenseComponentsPage.getTitle())
            .toMatch(/Licenses/);

    });

    it('should load create License dialog', () => {
        licenseComponentsPage.clickOnCreateButton();
        licenseDialogPage = new LicenseDialogPage();
        expect(licenseDialogPage.getModalTitle())
            .toMatch(/Create or edit a License/);
        licenseDialogPage.close();
    });

    it('should create and save Licenses', () => {
        licenseComponentsPage.clickOnCreateButton();
        licenseDialogPage.setNameInput('name');
        expect(licenseDialogPage.getNameInput()).toMatch('name');
        licenseDialogPage.setDescriptionInput('description');
        expect(licenseDialogPage.getDescriptionInput()).toMatch('description');
        licenseDialogPage.planSelectLastOption();
        licenseDialogPage.save();
        expect(licenseDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class LicenseComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-license div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class LicenseDialogPage {
    modalTitle = element(by.css('h4#myLicenseLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    descriptionInput = element(by.css('input#field_description'));
    planSelect = element(by.css('select#field_plan'));

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

    planSelectLastOption = function() {
        this.planSelect.all(by.tagName('option')).last().click();
    };

    planSelectOption = function(option) {
        this.planSelect.sendKeys(option);
    };

    getPlanSelect = function() {
        return this.planSelect;
    };

    getPlanSelectedOption = function() {
        return this.planSelect.element(by.css('option:checked')).getText();
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

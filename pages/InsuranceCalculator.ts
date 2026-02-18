import {Page, Locator} from '@playwright/test'


export class InsuranceCalculator {

    readonly page:Page;
    readonly acceptCookiesButton:Locator;
    readonly angesteltCheckBox: Locator;
    readonly einkommenTextbox: Locator;
    readonly employmentWeiterButton: Locator;
    readonly insuranceWeiterButton: Locator;
    readonly einkommenControlText: Locator;
    readonly versicherungsstartCombobox: Locator;
    readonly birthdayTagText: Locator;
    readonly birthdayMonthText: Locator;
    readonly birthdayYearText: Locator;
    readonly genericErrorText:Locator;
    readonly birthdayNextButton: Locator;
    readonly insurancestatusWeiterButton: Locator;
    readonly childrennokidsWeiterButton: Locator;
    readonly tariffoptionsrecommendedContinueButton: Locator;
    readonly readultprimarycontentText: Locator;




    // InsuranceCalculator.ts dosyasına bunu yaz:




    constructor (page:Page) {
        this.page = page;
        this.acceptCookiesButton = page.getByRole('button', { name: 'Alles akzeptieren' });
        this.angesteltCheckBox = page.getByText('Angestellt');
        this.employmentWeiterButton = page.locator('[data-cy="employment-status-continue"]');
        this.insuranceWeiterButton = page.locator('[data-cy="insurance-product-continue"]');
        this.einkommenTextbox = page.getByRole('textbox', { name: 'Einkommen' });   
        this.einkommenControlText = page.locator('.income-limit-disclaimer-balloon .disclaimer');
        this.versicherungsstartCombobox = page.getByLabel('Versicherungsstart');
        this.birthdayTagText = page.getByRole('textbox', { name: 'Tag' });
        this.birthdayMonthText = page.getByRole('textbox', { name: 'Monat' });
        this.birthdayYearText = page.getByRole('textbox', { name: 'Jahr' });
        this.genericErrorText = page.locator('.validation-message-text');
        this.birthdayNextButton = page.locator('[data-cy="birthday-continue"]');
        this.insurancestatusWeiterButton = page.locator('[data-cy="insurance-status-continue"]');
        this.childrennokidsWeiterButton = page.locator('[data-cy="children-no-kids-continue"]');
        this.tariffoptionsrecommendedContinueButton = page.getByRole('button', { name: 'Unsere Empfehlung übernehmen' })
        this.readultprimarycontentText = page.getByRole('heading', { name: 'Klasse, hier dein Angebot' });


    }


async navigateToCalculator() {
        await this.page.goto('/'); 

        try {
            await this.acceptCookiesButton.waitFor({ state: 'visible', timeout: 3000 });
            await this.acceptCookiesButton.click();

        }
        catch(error) {

        }
        
        await this.page.goto('/online-beitragsrechner/versicherungswahl/berufsstatus');     
    }



  async selectInsuranceStartDate(date: string) {
        await this.versicherungsstartCombobox.selectOption({ label: date });
    }


    async selectBirthDay(tag:string , month:string , year:string) {

        await this.birthdayTagText.fill(tag)
        await this.birthdayMonthText.fill(month)
        await this.birthdayYearText.fill(year)

    }




}
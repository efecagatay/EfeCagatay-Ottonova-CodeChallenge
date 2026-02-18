import {test, expect} from '@playwright/test'
import {InsuranceCalculator} from '../pages/InsuranceCalculator'
import testData from '../data/calculatorData.json';


test.describe ('Digital Assistant - Insurance Contribution Calculator' , () => {
    let insuranceCalculator: InsuranceCalculator;

    

    test.beforeEach(async ({page}) => {
        insuranceCalculator = new InsuranceCalculator(page);
        await insuranceCalculator.navigateToCalculator();
        await insuranceCalculator.angesteltCheckBox.click();
    });



    for( const data of testData.incomeTests) {

        test(`Income Check: ${data.description} (${data.amount}€)` , async ({page}) =>{
        
        await insuranceCalculator.einkommenTextbox.fill(data.amount);


        if (data.expectedMessage.length>0){
              await expect (insuranceCalculator.einkommenControlText).toContainText(data.expectedMessage)

        }
        else {
            await expect (insuranceCalculator.einkommenControlText).toBeHidden();
        }       

        })
    }




    for (const data of testData.birthdayTests) {
        test (`Birthday Validation: ${data.description} (${data.age})`, async ({page}) =>{

        const currentYear = new Date().getFullYear();
        const calculatedBirthYear = (currentYear - data.age).toString();
        await insuranceCalculator.einkommenTextbox.fill('80000');
        await insuranceCalculator.employmentWeiterButton.click({ force: true });
        await insuranceCalculator.selectInsuranceStartDate('01.06.2026');
        await insuranceCalculator.insuranceWeiterButton.click({ force: true });
        await insuranceCalculator.selectBirthDay(data.birthdayTag, data.birthdayMonth , calculatedBirthYear);

        if(data.expectedMessage.length>0){
            await expect (insuranceCalculator.genericErrorText).toContainText(data.expectedMessage);
        }
        else{
            await expect (insuranceCalculator.genericErrorText).toBeHidden();

        }
       
    })

    }


    test('E2E Happy Path: Valid Application Flow', async ({page}) => {
        await insuranceCalculator.einkommenTextbox.fill('80000');
        await insuranceCalculator.employmentWeiterButton.click({ force: true });
        await insuranceCalculator.vollversicherungCheckBox.click();
        await insuranceCalculator.selectInsuranceStartDate('01.06.2026');
        await insuranceCalculator.insuranceWeiterButton.click({ force: true });
        await insuranceCalculator.selectBirthDay('02', '06' , '1994');
        await insuranceCalculator.birthdayNextButton.click();
        await insuranceCalculator.insurancestatusWeiterButton.click();
        await insuranceCalculator.childrennokidsWeiterButton.click();
        await insuranceCalculator.tariffoptionsrecommendedContinueButton.click();
        await expect (insuranceCalculator.readultprimarycontentText).toContainText('Klasse, hier dein Angebot');





    })












           

    
})
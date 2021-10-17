import { api, LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import DAILY_ELECTRICITY_UNITS from '@salesforce/schema/Daily_Electricity_Units__c';
import DATE_TIME from '@salesforce/schema/Daily_Electricity_Units__c.Select_Date_and_Time__c';
import  UNITS from '@salesforce/schema/Daily_Electricity_Units__c.Units_for_the_Day__c';

export default class EnterDailyElectricityUnits extends LightningElement {

    deuId;
    dateTime;
    units;

    recordChange(event)
    {
        const field = event.target.name;
        if (field === 'datetime') {
            this.dateTime = event.target.value;
        } else if (field === 'units') {
            this.units = event.target.value;
        }
    }
    
    saveRecord(event)
    {
        const fields = {};
        fields[DATE_TIME.fieldApiName] = this.dateTime;
        fields[UNITS.fieldApiName] = this.units;
        const recordInput = { apiName: DAILY_ELECTRICITY_UNITS.objectApiName, fields};
        createRecord(recordInput).then(
            deu => {
                this.deuId = deu.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record created',
                        variant: 'success',
                    }),
                );
            }
        ).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error',
                }),
            );
        });
        

   }

    cancelSave(event)
    {
       console.log('new log');
      console.log('cancel pressed  '+ this.template.querySelector('lightning-input[name="units"]').innerText + 'added');
      //this.template.querySelector('lightning-input[name="units"]').innerHTML;
       
       //this.template.querySelector('lightning-input[name="units"]').value='';
    }

}
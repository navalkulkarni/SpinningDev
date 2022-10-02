import { api,LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import APINAME from '@salesforce/schema/Property_enquiry__c';
export default class MyPropertyEnquiry extends LightningElement {

    @api propertyId;
    objectApiName = APINAME;
    handleSuccess(event)
    {
        this.dispatchEvent(new ShowToastEvent({
            title: 'Success',
            message: 'Enquiry Submitted Successfully 👍',
            variant: 'success'
        }));
    }

}
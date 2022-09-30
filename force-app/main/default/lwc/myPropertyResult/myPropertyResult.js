import { wire,LightningElement } from 'lwc';
import getPropertyDetails from '@salesforce/apex/PropertyController.getLatestProperty';
export default class MyPropertyResult extends LightningElement {

    propertyList;
    error;

    @wire(getPropertyDetails)
    wiredProperties ({error, data}) {
        if (error) {
            this.error = error;
            showToast(this.error);
        } else if (data) {
            // TODO: Data handling
            this.propertyList = data;
        }
    }

    showToast(errorMessage){
        const errorEvent = this.dispatchEvent(new ShowToastEvent({
            title: 'Error :',
            message: errorMessage,
            variant: 'error'
        }));
    }

}
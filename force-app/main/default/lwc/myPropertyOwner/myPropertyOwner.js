import { api,wire,LightningElement } from 'lwc';
import APINAME from '@salesforce/schema/Property_Owner__c';
import EMAIL from '@salesforce/schema/Property_Owner__c.Email__c';
import PHOTO from '@salesforce/schema/Property_Owner__c.Owner_Photo__c';
import NAME from '@salesforce/schema/Property_Owner__c.Owner_Name__c';
import PHONE_FIELD from '@salesforce/schema/Property_Owner__c.Owner_Phone__c';
import ADDRESS from '@salesforce/schema/Property_Owner__c.Owner_Address__c';
export default class MyPropertyOwner extends LightningElement {

    @api propertyOwnerId;
    @api objectApiName = APINAME;

    emailField = EMAIL;
    photoField = PHOTO;

    nameField = NAME;
    phoneField = PHONE_FIELD;
    addressField = ADDRESS;

    connectedCallback(){
        console.log('propertyOwnerId'+this.propertyOwnerId);
    }

    renderedCallback(){
        console.log('propertyOwnerId in rendered'+this.propertyOwnerId);
    }

}
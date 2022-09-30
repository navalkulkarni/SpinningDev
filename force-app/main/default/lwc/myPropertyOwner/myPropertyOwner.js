import { api,wire,LightningElement } from 'lwc';
import APINAME from '@salesforce/schema/Property_Owner__c';

export default class MyPropertyOwner extends LightningElement {

    @api recordId;
    @api objectApiName = APINAME;

}
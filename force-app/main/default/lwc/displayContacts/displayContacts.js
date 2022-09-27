import { wire,LightningElement } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
export default class DisplayContacts extends LightningElement{

    contactList;
    @wire(getContacts) 
    checkNameOfAccount({error,data}){
        if(data){
            this.contactList = data;
        }else if(error){
            this.errorDetails = error;
        }
    };

}
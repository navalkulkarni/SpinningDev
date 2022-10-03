import { wire,LightningElement,track } from 'lwc';
import getPropertyDetails from '@salesforce/apex/PropertyController.getLatestProperty';
import { NavigationMixin} from 'lightning/navigation';
import getSearchedProperty from '@salesforce/apex/PropertyDetais.getSearchedProperty';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class MyPropertyResult extends LightningElement {

    propertyList;
    error;

    ownerId;
    openOwnerModal = false;
    openEnquiryModal = false;

    @track propertyId;

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

    showOwnerDetails(event)
    {
        this.ownerId = event.target.value;
        console.log(this.ownerId);
        this.openOwnerModal = true;
    }

    closeOwnerModal(event)
    {
        this.openOwnerModal = false;
    }

    showEnquiryForm(event){
        this.propertyId = event.target.value;
        this.openEnquiryModal = true;
    }

    closeEnquiryModal(event)
    {
        this.openEnquiryModal = false;
    }

    @wire(CurrentPageReference) pageRef;
    connectedCallback(){
        registerListener("handleLocFilterChange", this.handleLocFilterChange,this) ;   
    }
    disconnectedCallback(){
        unregisterAllListeners(this);    
    }
    handleLocFilterChange(locchange){
        this.locFilter = locchange;
        getSearchedProperty({
            location: this.locFilter,
            bedroom : this.bedroomFilter,
            bathroom :this.bathroomFilter,
            maxbudget: this.budgetFilter
        })
        .then(result=>{
            this.properties = result;
        })
        .catch(error =>{
            this.showToast(error);
        });
    }
}
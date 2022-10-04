import { wire,LightningElement,track } from 'lwc';
import getPropertyDetails from '@salesforce/apex/PropertyController.getLatestProperty';
import { NavigationMixin} from 'lightning/navigation';
import getSearchedProperty from '@salesforce/apex/PropertyController.getSearchedProperty';
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
        registerListener("handleBedRoomChange", this.handleBedRoomChange,this) ;
        registerListener("handleBathRoomChange", this.handleBathRoomChange,this) ;
        registerListener("handleBudgetChange", this.handleBudgetChange,this) ;   
    }
    disconnectedCallback(){
        unregisterAllListeners(this);    
    }
    handleLocFilterChange(locchange){
        this.locFilter = locchange;
        console.log(this.locFilter+' inside event handler');
        getSearchedProperty({
            location: this.locFilter,
            bedroom : this.bedroomFilter,
            bathroom :this.bathroomFilter,
            maxbudget: this.budgetFilter
        })
        .then(result=>{
            this.propertyList = result;
        })
        .catch(error =>{
            this.showToast(error);
        });
    }

    handleBedRoomChange(bedRoomChange){
        this.bedRoomFilter = bedRoomChange;
        console.log(this.bedRoomFilter+' inside event handler');
        getSearchedProperty({
            location: this.locFilter,
            bedroom : this.bedroomFilter,
            bathroom :this.bathroomFilter,
            maxbudget: this.budgetFilter
        })
        .then(result=>{
            this.propertyList = result;
            console.log(this.propertyList);
        })
        .catch(error =>{
            this.showToast(error);
        });
    }
    handleBathRoomChange(bathRoomChange){
        this.bathRoomFilter = bathRoomChange;
        console.log(this.bathRoomFilter+' inside event handler');
        getSearchedProperty({
            location: this.locFilter,
            bedroom : this.bedroomFilter,
            bathroom :this.bathroomFilter,
            maxbudget: this.budgetFilter
        })
        .then(result=>{
            this.propertyList = result;
            console.log(this.propertyList);
        })
        .catch(error =>{
            this.showToast(error);
        });
    }
    handleBudgetChange(budgetChange){
        this.budgetFilter = budgetChange;
        console.log(this.budgetFilter+' inside event handler');
        getSearchedProperty({
            location: this.locFilter,
            bedroom : this.bedroomFilter,
            bathroom :this.bathroomFilter,
            maxbudget: this.budgetFilter
        })
        .then(result=>{
            this.propertyList = result;
        })
        .catch(error =>{
            this.showToast(error);
        });
    }
}
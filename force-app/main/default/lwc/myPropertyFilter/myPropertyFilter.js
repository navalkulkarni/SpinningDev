import { LightningElement, wire } from 'lwc';
import { fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class MyPropertyFilter extends LightningElement {

    location;
    noOfBedrooms;
    noOfBathrooms;
    budgetValue;
    get locationOptions(){
        return [
            {label: 'All',value:'All'},
            {label: 'Mumbai',value:'Mumbai'},
            {label: 'Pune',value:'Pune'},
            {label: 'Bangalore',value:'Bangalore'}
        ]
    }

    get bedroomCountOptions(){
        return [
            {label: '1',value:'1'},
            {label: '2',value:'2'},
            {label: '3',value:'3'},
            {label: '4',value:'4'},
            {label: '5',value:'5'},
            {label: '6',value:'6'}
        ]
    }
    get bathroomCountOptions(){
        return [
            {label: '1',value:'1'},
            {label: '2',value:'2'},
            {label: '3',value:'3'},
            {label: '4',value:'4'},
            {label: '5',value:'5'},
            {label: '6',value:'6'}
        ]
    }

    @wire(CurrentPageReference) pageRef;
    handleLocationChange(event){
        this.location = event.target.value;
        console.log(this.location);
        fireEvent(this.pageRef, "handleLocFilterChange", this.location);
    }
    handleBedroomChange(event){
        this.noOfBedrooms = parseInt(event.target.value);
        console.log(this.noOfBedrooms);
        fireEvent(this.pageRef, "handleBedRoomChange", this.noOfBedRooms);
    }
    handleBathroomChange(event){
        this.noOfBathrooms = parseInt(event.target.value);
        console.log(this.noOfBathrooms);
        fireEvent(this.pageRef, "handleBathRoomChange", this.noOfBathrooms);
    }
    handleBudgetChange(event){
        this.budgetValue = parseInt(event.target.value);
        console.log(this.budgetValue);
        fireEvent(this.pageRef, "handleBudgetChange", this.budgetValue);
    }

}
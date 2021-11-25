import { LightningElement } from 'lwc';
import getWorkers from '@salesforce/apex/WorkloadDataController.getWorkers';

export default class EnterWorkloadData extends LightningElement {

    inputValue;
    listOfNames = [];
    orgResult;
    error;

    handleClick(event){
        this.inputValue = this.template.querySelector('.workerName').value;
        console.log('input value is new:'+this.inputValue);
        this.listOfNames.push(this.inputValue);
        this.template.querySelector('.workerName').value='';
       
        for (let index = 0; index < this.listOfNames.length; index++) {
            const element = this.listOfNames[index];
            console.log('List element is : '+element);
        }
        
        //console.log('Data from Salesforce :'+this.orgResult);
                
    }

    handleClearList(event){
        this.listOfNames = [];
        this.template.querySelector('.workerName').value='';
    }

    handleAbsentClick(event)
    {
        getWorkers({workerNames : this.listOfNames})
        .then((result) => {
            
            this.orgResult = result;
            console.log('Data from Salesforce :'+ result);
            this.error = undefined;
        }).catch((error)=>{
            this.error = error;
            this.orgResult = undefined;
        })

    }

}
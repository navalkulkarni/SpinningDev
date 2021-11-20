import { LightningElement } from 'lwc';

export default class EnterWorkloadData extends LightningElement {

    inputValue;
    listOfNames = [];

    handleClick(event){
        this.inputValue = this.template.querySelector('.workerName').value;
        console.log('input value is new:'+this.inputValue);
        this.listOfNames.push(this.inputValue);
       
        for (let index = 0; index < this.listOfNames.length; index++) {
            const element = this.listOfNames[index];
            console.log('List element is : '+element);
        }
        this.template.querySelector('.workerName').value='';
                
    }

}
import { LightningElement } from 'lwc';
import BOATMC from '@salesforce/messageChannel/BoatMessageChannel';
export default class EmailTempPOC extends LightningElement {

    value = 'Select one option';

    selectedTemplate = [];
    emailTemplateAuddis = [
        {
            Id: 1,
            Name: 'Registered Name'
        },
        {
            Id: 2,
            Name: 'Originators Name'
        },
        {
            Id: 3,
            Name: 'Town'
        },
        {
            Id: 4,
            Name: 'City'
        }
    ];

    emailTemplateDormancy = [
        {
            Id: 1,
            Name: 'Account Closure Date'
        },
        {
            Id: 2,
            Name: 'Credit Balance'
        }
    ];

    get options() {
        return [
            { label: 'AUDDIS Originator', value: 'AUDDIS Originator' },
            { label: 'Dormancy', value: 'Dormancy' },
            { label: 'Striking Off', value: 'Striking Off' },
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
        if(this.value=='AUDDIS Originator')
            this.selectedTemplate= this.emailTemplateAuddis;
        else
            this.selectedTemplate = this.emailTemplateDormancy;
    }

    handleSaveClick(event)
    {
        console.log('in click event'+ this.template.querySelectorAll('.tempField'));
        const nodeList = this.template.querySelectorAll('.tempField');

        for (let index = 0; index < nodeList.length; index++) {
            console.log(nodeList[index].value);
            nodeList[index].value = '';
        }

    }

}
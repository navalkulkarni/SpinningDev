import { api, LightningElement } from 'lwc';

export default class EnterDailyElectricityUnits extends LightningElement {

    
    dateTime;
    units;

    recordChange(event)
    {
        const field = event.target.name;
        if (field === 'datetime') {
            this.dateTime = event.target.value;
        } else if (field === 'units') {
            this.units = event.target.value;
        }
    }
    
    saveRecord(event)
    {
        console.log('Save Pressed'+ this.units + this.dateTime);
    }

    cancelSave(event)
    {
        console.log('Cancel Pressed');
    }

}
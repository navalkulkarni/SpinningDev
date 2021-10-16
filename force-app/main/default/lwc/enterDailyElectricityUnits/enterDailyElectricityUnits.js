import { api, LightningElement } from 'lwc';

export default class EnterDailyElectricityUnits extends LightningElement {

    dateTime;
    units;

    @api
    get dateTime(){
        return this.dateTime;
    }

    set dateTime(value)
    {
        this.dateTime = value;
    
    }

    @api
    get units(){
        return this.units;
    }

    set units(value){
        this.units = value;
    }

    setDateTime(event) {
        console.log(event.target.value);
    }

    setUnits(event)
    {
        console.log(event.target.value);
    }


}
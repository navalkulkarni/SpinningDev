import { LightningElement } from 'lwc';
import createCountInformation from '@salesforce/apex/WindingWorkerSalaryCalculator.createCountInformation';
import getWorker from '@salesforce/apex/WindingWorkerSalaryCalculator.getWorker';


export default class WindingWorkerSalary extends LightningElement {

    worker;
    workerId;
    isSelected;
    is40SlubDisabled = false;
    is50SlubDisabled = false;
    is62NTDisabled = false;
    is40NTDisabled = false;
    is50NTDisabled = false;
    isBottomDisabled = false;
    isMixCountDisabled = false;
    yarnCount='40 Slub';
    monthName = 'November';
    countKgList;
    year = 2021;
    error;
    workerError;
    workerIdValidation= false;
    Nt40Kg=0;
    slub40Kg=0;
    slub50Kg=0;
    Nt62Kg=0;
    Nt50Kg=0;
    bottomKg=0;
    mixCountKg=0;

    initializeCounts(){
          
        this.workerId = this.template.querySelector('.WorkerIdInput').value;
        if(this.workerId >=100 && this.workerId <=999){
            this.workerIdValidation = false;
            this.Nt40Kg=0;
            this.slub40Kg=0;
            this.slub50Kg=0;
            this.Nt62Kg=0;
            this.Nt50Kg=0;
            this.bottomKg=0;
            this.mixCountKg=0;
            this.is40SlubDisabled = false;
            this.is50SlubDisabled = false;
            this.is62NTDisabled = false;
            this.is40NTDisabled = false;
            this.is50NTDisabled = false;
            this.isBottomDisabled = false;
            this.isMixCountDisabled = false;
        }
        else
            this.workerIdValidation = true;

            
    }

    handleSalaryClick(event)
    {
        //this.workerId = this.template.querySelector('.WorkerIdInput').value;
          
        //this.yarnCount = this.template.querySelector('.YarnCount').value;
        this.yarnCount = event.target.label;
        console.log(this.workerId);
        getWorker({WorkerId : this.workerId})
            .then((result)=>{
                this.worker = result;
                this.workerError = undefined;
            }).catch((error)=>{
                this.workerError = error;
                this.worker = undefined;
            })
        createCountInformation({WorkerId:this.workerId,Month:this.monthName,Year:this.year,CountValue:this.yarnCount})
        .then(result => {
            console.log(result);
            console.log(JSON.stringify(result));
            this.countKgList = result;
            this.calculateCountWiseKg(this.countKgList,this.yarnCount);
            this.error = undefined;
        }).catch((error)=>{
            this.error = error;
            //this.orgResult = undefined;
        })

        
    }

    calculateCountWiseKg(p_countKgList,p_yarnCount){

        
        p_countKgList[p_yarnCount].forEach(element => {
            if(p_yarnCount == '40 NT')
                this.Nt40Kg += parseInt(element);
            else if(p_yarnCount == '40 Slub')
                this.slub40Kg += parseInt(element);
            else if(p_yarnCount == '50 Slub')
                this.slub50Kg += parseInt(element);
            else if(p_yarnCount == '62 NT')
                this.Nt62Kg += parseInt(element);
            else if(p_yarnCount == '50 NT')
                this.Nt50Kg += parseInt(element);
            else if(p_yarnCount == 'Bottom')
                this.bottomKg += parseInt(element);
            else if(p_yarnCount == 'Mix Count')
                this.mixCountKg += parseInt(element);
        });

        if(this.slub40Kg > 0){
            this.is40SlubDisabled = true;
        }
        if(this.slub50Kg > 0){
            this.is50SlubDisabled = true;
        }
        if(this.Nt62Kg > 0){
            this.is62NTDisabled = true;
        }
        if(this.Nt40Kg > 0){
            this.is40NTDisabled = true;
        }
        if(this.Nt50Kg > 0){
            this.is50NTDisabled = true;
        }
        if(this.bottomKg > 0){
            this.isBottomDisabled = true;
        }
        if(this.mixCountKg > 0){
            this.isMixCountDisabled = true;
        }

    }

    
}
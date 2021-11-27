import { LightningElement } from 'lwc';
import createCountInformation from '@salesforce/apex/WindingWorkerSalaryCalculator.createCountInformation';


export default class WindingWorkerSalary extends LightningElement {

    previousSearchId=0;
    workerId;
    yarnCount='40 Slub';
    monthName = 'November';
    countKgList;
    year = 2021;
    error;
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
        }
        else
            this.workerIdValidation = true;

    }

    handleSalaryClick(event)
    {
        this.workerId = this.template.querySelector('.WorkerIdInput').value;
          
        this.yarnCount = this.template.querySelector('.YarnCount').value;
        console.log(this.workerId);
        createCountInformation({WorkerId:this.workerId,Month:this.monthName,Year:this.year,CountValue:this.yarnCount})
        .then(result => {
            console.log(result);
            console.log(JSON.stringify(result));
            this.countKgList = result;
            this.calculateCountWiseKg(this.countKgList,this.yarnCount);
        }).catch((error)=>{
            this.error = error;
            //this.orgResult = undefined;
        })
    }

    calculateCountWiseKg(p_countKgList,p_yarnCount){

        
        p_countKgList[p_yarnCount].forEach(element => {
            if(p_yarnCount == '40NT')
                this.Nt40Kg +=element;
            else if(p_yarnCount == '40 Slub')
                this.slub40Kg += element;
            else if(p_yarnCount == '50 Slub')
                this.slub50Kg += element;
            else if(p_yarnCount == '62 NT')
                this.Nt62Kg += element;
            else if(p_yarnCount == '50 NT')
                this.Nt50Kg += element;
            else if(p_yarnCount == 'Bottom')
                this.bottomKg += element;
            else if(p_yarnCount == 'Mix Count')
                this.mixCountKg += element;
        });

    }

}
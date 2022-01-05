public with sharing class WindingWorkerSalaryCalculator {
    
    public WindingWorkerSalaryCalculator() {

    }

    /*
    Map<Integer,String> countValues = new Map<Integer,String>{ 1 => '40NT', 2=>'40 Slub', 
                                                                3=>'50 Slub', 4=>'62 NT', 
                                                                5=>'50 NT', 6=>'Bottom',
                                                                7=>'Mix Count'};
    */
    
    public static List<String> NT40List = new List<String>();
    public static List<String> Slub40List = new List<String>();
    public static List<String> Slub50List = new List<String>();
    public static List<String> NT62List = new List<String>();
    public static List<String> NT50List = new List<String>();
    public static List<String> bottomCount  = new List<String>();
    public static List<String> mixCount = new List<String>();
    public static List<String> millHoliday = new List<String>();
    
    public static Map<String, List<String>> countToProdCollection = new Map<String,List<String>>{'40 NT'=> NT40List,
                                                                                    '40 Slub'=>Slub40List,
                                                                                    '50 Slub'=>Slub50List, '62 NT'=>NT62List,
                                                                                   '50 NT'=>NT50List, 'Bottom'=>bottomCount,
                                                                                   'Mix Count'=>mixCount 
                                                                                   
                                                                                };
    
    
    
    /*
    public List<Monthly_Workload__c> getWorkerData(String WorkerId)
    {



        List<Monthly_Workload__c> windingWorkers = [SELECT Name,Worker__r.Worker_Id__c,Day_1_Count__c,Day_2_Count__c,Day_3_Count__c,Day_4_Count__c,Day_5_Count__c,
        Day_6_Count__c,Day_7_Count__c,Day_8_Count__c,Day_9_Count__c,Day_10_Count__c,Day_11_Count__c,Day_12_Count__c,Day_13_Count__c,
        Day_14_Count__c,Day_15_Count__c,Day_16_Count__c,Day_17_Count__c,Day_18_Count__c,Day_19_Count__c,Day_20_Count__c,Day_21_Count__c,
        Day_22_Count__c,Day_23_Count__c,Day_24_Count__c,Day_25_Count__c,Day_26_Count__c,Day_27_Count__c,Day_28_Count__c,Day_29_Count__c,
        Day_30_Count__c,Day_31_Count__c FROM Monthly_Workload__c WHERE Worker__r.Department__c='Winding' AND Month_Name__c='November'
         AND Year__c=2021 AND Worker__r.Worker_Id__c:=WorkerId];

         return windingWorkers;
    }
    */

    @AuraEnabled
    public static Worker__c getWorker(String WorkerId){
        try {
            Worker__c w = [SELECT Id,Name,Worker_Id__c,Department__c FROM Worker__c WHERE Worker_Id__c =: WorkerId];
            return w;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Map<String, List<String>> createCountInformation(String WorkerId,String Month,Double Year,String CountValue){
        List<String> exceptList = new List<String>{'Mill Holiday','Absent Today','Weekly Off'};
        System.debug(WorkerId+ Month+Year+CountValue);
        for (Integer i = 1; i <=31; i++) {
            Monthly_Workload__c mw = new Monthly_Workload__c();
            String query = 'SELECT Name,Worker__r.Worker_Id__c,Day_'+i+'_Count__c,Day_'+i+'_Prod__c '+ 
            'FROM Monthly_Workload__c WHERE Worker__r.Department__c=\'Winding\' AND Day_'+i+'_Count__c NOT IN:exceptList AND Month_Name__c=:Month'+
            ' AND Year__c=:Year AND Worker__r.Worker_Id__c=:WorkerId ';
            
            try {
                mw = Database.query(query);
                
            } catch (Exception e) {
                
            }
            
            if(mw != null)
            {
                if(i==1 && mw.Day_1_Count__c != null)
                countToProdCollection.get(mw.Day_1_Count__c).add(String.valueOf(mw.Day_1_Prod__c));
            else if(i==2 && mw.Day_2_Count__c != null)
                countToProdCollection.get(mw.Day_2_Count__c).add(String.valueOf(mw.Day_2_Prod__c)); 
            else if(i==3 && mw.Day_3_Count__c != null)
                countToProdCollection.get(mw.Day_3_Count__c).add(String.valueOf(mw.Day_3_Prod__c));
            else if(i==4 && mw.Day_4_Count__c != null)
                countToProdCollection.get(mw.Day_4_Count__c).add(String.valueOf(mw.Day_4_Prod__c));
            else if(i==5 && mw.Day_5_Count__c != null)
                countToProdCollection.get(mw.Day_5_Count__c).add(String.valueOf(mw.Day_5_Prod__c));
            else if(i==6 && mw.Day_6_Count__c != null)
                countToProdCollection.get(mw.Day_6_Count__c).add(String.valueOf(mw.Day_6_Prod__c));  
            else if(i==7 && mw.Day_7_Count__c != null)
                countToProdCollection.get(mw.Day_7_Count__c).add(String.valueOf(mw.Day_7_Prod__c)); 
            else if(i==8 && mw.Day_8_Count__c != null)
                countToProdCollection.get(mw.Day_8_Count__c).add(String.valueOf(mw.Day_8_Prod__c));
            else if(i==9 && mw.Day_9_Count__c != null)
                countToProdCollection.get(mw.Day_9_Count__c).add(String.valueOf(mw.Day_9_Prod__c)); 
            else if(i==10 && mw.Day_10_Count__c != null)
                countToProdCollection.get(mw.Day_10_Count__c).add(String.valueOf(mw.Day_10_Prod__c));
            else if(i==11 && mw.Day_11_Count__c != null)
                countToProdCollection.get(mw.Day_11_Count__c).add(String.valueOf(mw.Day_11_Prod__c));
            else if(i==12 && mw.Day_12_Count__c != null)
                countToProdCollection.get(mw.Day_12_Count__c).add(String.valueOf(mw.Day_12_Prod__c)); 
            else if(i==13 && mw.Day_13_Count__c != null)
                countToProdCollection.get(mw.Day_13_Count__c).add(String.valueOf(mw.Day_13_Prod__c));
            else if(i==14 && mw.Day_14_Count__c != null)
                countToProdCollection.get(mw.Day_14_Count__c).add(String.valueOf(mw.Day_14_Prod__c));
            else if(i==15 && mw.Day_15_Count__c != null)
                countToProdCollection.get(mw.Day_15_Count__c).add(String.valueOf(mw.Day_15_Prod__c));
            else if(i==16 && mw.Day_16_Count__c != null)
                countToProdCollection.get(mw.Day_16_Count__c).add(String.valueOf(mw.Day_16_Prod__c));  
            else if(i==17 && mw.Day_17_Count__c != null)
                countToProdCollection.get(mw.Day_17_Count__c).add(String.valueOf(mw.Day_17_Prod__c)); 
            else if(i==18 && mw.Day_18_Count__c != null)
                countToProdCollection.get(mw.Day_18_Count__c).add(String.valueOf(mw.Day_18_Prod__c));
            else if(i==19 && mw.Day_19_Count__c != null)
                countToProdCollection.get(mw.Day_19_Count__c).add(String.valueOf(mw.Day_19_Prod__c)); 
            else if(i==20 && mw.Day_20_Count__c != null)
                countToProdCollection.get(mw.Day_20_Count__c).add(String.valueOf(mw.Day_20_Prod__c));
            else if(i==21 && mw.Day_21_Count__c != null)
                countToProdCollection.get(mw.Day_21_Count__c).add(String.valueOf(mw.Day_21_Prod__c));
            else if(i==22 && mw.Day_22_Count__c != null)
                countToProdCollection.get(mw.Day_22_Count__c).add(String.valueOf(mw.Day_22_Prod__c)); 
            else if(i==23 && mw.Day_23_Count__c != null)
                countToProdCollection.get(mw.Day_23_Count__c).add(String.valueOf(mw.Day_23_Prod__c));
            else if(i==24 && mw.Day_24_Count__c != null)
                countToProdCollection.get(mw.Day_24_Count__c).add(String.valueOf(mw.Day_24_Prod__c));
            else if(i==25 && mw.Day_25_Count__c != null)
                countToProdCollection.get(mw.Day_25_Count__c).add(String.valueOf(mw.Day_25_Prod__c));
            else if(i==26 && mw.Day_26_Count__c != null)
                countToProdCollection.get(mw.Day_26_Count__c).add(String.valueOf(mw.Day_26_Prod__c));  
            else if(i==27 && mw.Day_27_Count__c != null)
                countToProdCollection.get(mw.Day_27_Count__c).add(String.valueOf(mw.Day_27_Prod__c)); 
            else if(i==28 && mw.Day_28_Count__c != null)
                countToProdCollection.get(mw.Day_28_Count__c).add(String.valueOf(mw.Day_28_Prod__c));
            else if(i==29 && mw.Day_29_Count__c != null)
                countToProdCollection.get(mw.Day_29_Count__c).add(String.valueOf(mw.Day_29_Prod__c)); 
            else if(i==30 && mw.Day_30_Count__c != null)
                countToProdCollection.get(mw.Day_30_Count__c).add(String.valueOf(mw.Day_30_Prod__c));
            else if(i==31 && mw.Day_31_Count__c != null)
                countToProdCollection.get(mw.Day_31_Count__c).add(String.valueOf(mw.Day_31_Prod__c));
            }
                                                    
        }

        return new Map<String,List<String>>{CountValue=>countToProdCollection.get(CountValue)};
        
    }

       


    

}
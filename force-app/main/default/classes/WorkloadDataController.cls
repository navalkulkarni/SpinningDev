public with sharing class WorkloadDataController {
    
    public WorkloadDataController() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Worker__c> getWorkers(List<String> workerNames) {
        try {
            List<Worker__c> foundWorkers = [SELECT Id,Name,Worker_Id__c FROM Worker__c WHERE Worker_Id__c IN: workerNames ];
            System.debug('Found Workers list:' + foundWorkers);
            return foundWorkers;
    
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
                
    }

    
}

public with sharing class PropertyController {
    public PropertyController() {

    }

    @AuraEnabled(cacheable=true)
    public static list<Property__c> getLatestProperty(){
        list<Property__c> allPropertyList = new list<Property__c>();
        allPropertyList = [SELECT Id,
                                    Additional_Room__c,
                                    Available_From__c,
                                    Carpet_area_sqft__c,
                                    Coverd_area_sqft__c,
                                    Electricity_Status__c,
                                    Facing__c,
                                    Floor__c,
                                    For_Bachellor__c,
                                    For_Family__c,
                                    Furnishning_Available__c,
                                    Furnished_Type__c,
                                    Geo_Map__c,
                                    Landmark__c,
                                    Location__c,
                                    Area__c,
                                    street__c,
                                    country__c,
                                    Maintainance_Charge__c,
                                    No_of_Balcony__c,
                                    No_Of_Bath_Room__c,
                                    No_Of_Bed_Room__c,
                                    Property_Description__c,
                                    Property_Main_Image__c,
                                    Property_Owner__c,  
                                    Property_Video_URL__c,                                  
                                    Name,
                                    Rent__c,
                                    Security_Deposit__c,
                                    Status__c,
                                    Verified__c,
                                    Water_Availability__c
                            FROM Property__c
                            LIMIT 50
                            ];
        return allPropertyList;
    }
}

/*
* @author Gustavo Lincoln
*/
public with sharing class OrderSummaryController {
    
    @AuraEnabled
    public static List<Purchase> findPurchases( String userId ) {

        List<Order__c> orders = [ SELECT Id, Name, TotalPrice__c, Status__c, Address__c FROM Order__c WHERE OwnerId =: userId ];

        List<Purchase> purchases = new List<Purchase>();

        for( Order__c order : orders ) {

            purchases.add( new Purchase( order.Id, order.Name, order.Address__c, order.TotalPrice__c, order.Status__c ) );

        }

        return purchases;
    }

    @AuraEnabled
    public static List<Purchase> removePurchase( String userId, String orderId ) {

        Order__c order = new OrderRepository().findById( orderId );
        
        if( order != null ) delete order;

        return findPurchases( userId );
    
    }



    public class Purchase {

        @AuraEnabled
        public String id { get; set; }

        @AuraEnabled
        public String name { get; set; }

        @AuraEnabled
        public String address { get; set; }
        
        @AuraEnabled
        public Decimal totalPrice { get; set; }

        @AuraEnabled
        public String status { get; set; }

        public Purchase( String id, String name,String address, Decimal totalPrice, String status ) {
            this.id = id;
            this.name = name;
            this.address = address;
            this.totalPrice = totalPrice;
            this.status = status;
        }
        
    }

}
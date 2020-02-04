/*
* @author Gustavo Lincoln
*/
public with sharing class OrderController {
    
    @AuraEnabled
    public static Order__c processOrder( String orderDetailsRequest, String addressPayload ) {
        
        List<OrderDetail> orderDetails = (List<OrderDetail>) JSON.deserialize( orderDetailsRequest , List<OrderDetail>.class);

        OrderDeliveryAddress address = (OrderDeliveryAddress) JSON.deserialize( addressPayload, OrderDeliveryAddress.class );

        if( orderDetails.isEmpty() || address == null ) return null;

        try {
            
            return new OrderService().processOrders( orderDetails, address );
       
        } catch ( Exception e ) {

            throw new AuraHandledException ( 'There was an error when save Order. Details:  ' + e.getMessage() + '/' + e.getStackTraceString() );

        }

    }

    public class OrderDeliveryAddress {

        @AuraEnabled
        public String delivery { get; set; }

        @AuraEnabled
        public String address { get; set; }
        
        @AuraEnabled
        public Date deliveryDate { get; set; }

    }

}
/*
* @author Gustavo Lincoln
*/
public virtual class OrderItemTransformer {
    
    public OrderItem__c toOrderItem( Order__c order, OrderDetail orderDetail ) {

        return new OrderItem__c(Order__c = order.Id, 
                                Product__c = orderDetail.id, 
                                Price__c = ( orderDetail.price * orderDetail.quantity ) );

    }

}
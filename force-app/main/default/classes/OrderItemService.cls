/*
* @author Gustavo Lincoln
*/
public virtual class OrderItemService {
    
    private OrderItemTransformer transformer;
    private OrderItemRepository repository;

    public OrderItemService() {
        transformer = new OrderItemTransformer();
        repository = new OrderItemRepository();
    }

    public List<OrderItem__c> createOrdersItems( Order__c order, List<OrderDetail> orderDetails ) {

        List<OrderItem__c> orderItems = new List<OrderItem__c>();

        for( OrderDetail orderDetail : orderDetails ) {

            orderItems.add( buildOrderItem( order, orderDetail ) );

        }

        if( orderItems.isEmpty() ) return new List<OrderItem__c>();

        return repository.save( orderItems );

    }
    
    public OrderItem__c buildOrderItem( Order__c order, OrderDetail orderDetail ) {

        return transformer.toOrderItem( order, orderDetail );

    }


}
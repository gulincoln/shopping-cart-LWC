/*
* @author Gustavo Lincoln
*/
public virtual class OrderService {
    
    private OrderBuilder builder;
    private OrderRepository repository;
    private AccountService accountService;
    private OrderItemService orderItemService;

    public OrderService() {
        builder = new OrderBuilder();
        repository = new OrderRepository();
        accountService = new AccountService();
        orderItemService = new orderItemService();
    }

    public Order__c processOrders( List<OrderDetail> orderDetails, OrderController.OrderDeliveryAddress address ) {

        //create an account to associate with current user
        Account account = accountService.createAccount();

        //create
        Order__c order = (Order__c) repository.save( builder.buildOrder( account, address ) );

        //create OrderItems
        List<OrderItem__c> orderItems = orderItemService.createOrdersItems( order, orderDetails );

        return order;

    }

}
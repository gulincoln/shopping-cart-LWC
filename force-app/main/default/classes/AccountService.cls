/*
* @author Gustavo Lincoln
*/
public virtual class AccountService {

    private AccountRepository repository;

    public AccountService() {
        repository = new AccountRepository();
    }
    
    //create a mock account for test purpose
    public Account createAccount() {

        Account account = new Account( Name = 'mock account', OwnerId = UserInfo.getUserId() );
        return (Account) repository.save( account );

    }   

}
package onlinebank.cashservice;

import onlinebank.cashservice.model.CashAccount;
import onlinebank.cashservice.model.Transaction;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Created by achalise on 19/10/17.
 */
public interface CashAccountService {
    Mono<CashAccount> findById(String id);
    Flux<CashAccount> findByUserId(String userId);
    Mono<CashAccount> findByAccountNumber(String accountNumber);
    Mono<Boolean> processTransaction(Transaction transaction);
    Flux<Transaction> retrieveTransactionsForAccount(String accountId);
}

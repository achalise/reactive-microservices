package onlinebank.cashservice.repository;

import onlinebank.cashservice.model.CashAccount;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Created by achalise on 12/10/17.
 */
public interface CashAccountRepository extends ReactiveCrudRepository<CashAccount, String> {
    Flux<CashAccount> findByUserId(String userId);
    Mono<CashAccount> findByAccountNumber(String accountNumber);
}

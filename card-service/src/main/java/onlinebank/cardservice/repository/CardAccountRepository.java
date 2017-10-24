package onlinebank.cardservice.repository;

import onlinebank.cardservice.model.CardAccount;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Created by achalise on 24/10/17.
 */
public interface CardAccountRepository extends ReactiveCrudRepository<CardAccount, String> {
    Flux<CardAccount> findByUserId(String userId);
    Mono<CardAccount> findByAccountNumber(String accountNumber);
}

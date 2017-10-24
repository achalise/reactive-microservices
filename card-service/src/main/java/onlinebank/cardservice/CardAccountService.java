package onlinebank.cardservice;

import onlinebank.cardservice.model.CardAccount;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Created by achalise on 25/10/17.
 */
public interface CardAccountService {
    Mono<CardAccount> findById(String id);
    Flux<CardAccount> findByUserId(String userId);
    Mono<Void> updateBalance(long amt);
}

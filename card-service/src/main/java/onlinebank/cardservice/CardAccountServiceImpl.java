package onlinebank.cardservice;

import onlinebank.cardservice.model.CardAccount;
import onlinebank.cardservice.repository.CardAccountRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Created by achalise on 25/10/17.
 */

@Service
public class CardAccountServiceImpl implements CardAccountService {

    private CardAccountRepository cardAccountRepository;

    public CardAccountServiceImpl(CardAccountRepository repository) {
        this.cardAccountRepository = repository;
    }

    @Override
    public Mono<CardAccount> findById(String id) {
        return this.cardAccountRepository.findById(id);
    }

    @Override
    public Flux<CardAccount> findByUserId(String userId) {
        return this.cardAccountRepository.findByUserId(userId);
    }

    @Override
    public Mono<Void> updateBalance(long amt) {
        return null;
    }
}

package onlinebank.cashservice;

import onlinebank.cashservice.model.CashAccount;
import onlinebank.cashservice.repository.CashAccountRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Created by achalise on 19/10/17.
 */

@Service
public class CashAccountServiceImpl implements CashAccountService {

    private CashAccountRepository cashAccountRepository;

    public CashAccountServiceImpl(CashAccountRepository cashAccountRepository) {
        this.cashAccountRepository = cashAccountRepository;
    }

    @Override
    public Mono<CashAccount> findById(String id) {
        return cashAccountRepository.findById(id);
    }

    @Override
    public Flux<CashAccount> findByUserId(String userId) {
        return cashAccountRepository.findByUserId(userId);
    }

    @Override
    public Mono<CashAccount> findByAccountNumber(String accountNumber) {
        return cashAccountRepository.findByAccountNumber(accountNumber);
    }

    @Override
    public Mono<Void> updateBalance(long amt) {
        return null;
    }
}

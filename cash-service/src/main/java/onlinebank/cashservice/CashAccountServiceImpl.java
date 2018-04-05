package onlinebank.cashservice;

import onlinebank.cashservice.model.CashAccount;
import onlinebank.cashservice.model.Transaction;
import onlinebank.cashservice.repository.CashAccountRepository;
import onlinebank.cashservice.repository.TransactionRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Created by achalise on 19/10/17.
 */

@Service
public class CashAccountServiceImpl implements CashAccountService {

    private CashAccountRepository cashAccountRepository;

    private TransactionRepository transactionRepository;

    public CashAccountServiceImpl(CashAccountRepository cashAccountRepository, TransactionRepository transactionRepository) {
        this.cashAccountRepository = cashAccountRepository;
        this.transactionRepository = transactionRepository;
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
    public Mono<Boolean> processTransaction(Transaction transaction) {
        return Mono.create(sink -> {
            findByAccountNumber(transaction.getAccountNumber())
                    .flatMap(ca -> updateAccount(ca, transaction))
                    .then(transactionRepository.save(transaction))
                    .subscribe(t -> sink.success(true), err -> sink.success(false));
        });
    }

    @Override
    public Flux<Transaction> retrieveTransactionsForAccount(String accountId) {
        return Flux.from(cashAccountRepository.findById(accountId))
                .map(account -> account.getAccountNumber())
                .log("The account retrieved")
                .log()
                .flatMap(accNumber -> transactionRepository.findByAccountNumber(accNumber));
    }

    private Mono<CashAccount> updateAccount(CashAccount account, Transaction txn) {
        if (txn.getTransactionType().equals("CREDIT")) {
            account.setAvailableBalance(account.getAvailableBalance() + txn.getAmount().intValue());
        } else {
            account.setAvailableBalance(account.getAvailableBalance() - txn.getAmount().intValue());
        }
        return cashAccountRepository.save(account);
    }
}
package onlinebank.cashservice;

import onlinebank.cashservice.model.CashAccount;
import onlinebank.cashservice.model.Transaction;
import onlinebank.cashservice.repository.CashAccountRepository;
import onlinebank.cashservice.repository.TransactionRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;

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
                    .doOnError(e -> {System.out.println("Error when retrieving the account: " + e);})
                    .flatMap(ca -> updateAccount(ca, transaction))
                    .map(ca -> updateTransactionBalance(ca.getBalance(), transaction))
                    .then(transactionRepository.save(transaction))
                    .subscribe(t -> sink.success(true), err -> {
                        err.printStackTrace();
                        sink.success(false);
                    });
        });
    }

    private Transaction updateTransactionBalance(long balance, Transaction transaction) {
        transaction.setBalance(BigDecimal.valueOf(balance));
        return transaction;
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
        System.out.println("Updating account " + account.getAccountNumber());
        if (txn.getTransactionType().equals("CREDIT")) {
            account.setBalance(account.getBalance() + txn.getAmount().intValue());
            account.setAvailableBalance(account.getAvailableBalance() + txn.getAmount().intValue());
        } else {
            account.setBalance(account.getBalance() + txn.getAmount().intValue());
            account.setAvailableBalance(account.getAvailableBalance() - txn.getAmount().intValue());
        }
        return cashAccountRepository.save(account);
    }
}
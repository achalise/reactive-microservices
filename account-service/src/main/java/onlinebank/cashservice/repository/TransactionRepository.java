package onlinebank.cashservice.repository;

import onlinebank.cashservice.model.Transaction;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;

public interface TransactionRepository extends ReactiveCrudRepository<Transaction, String> {
    Flux<Transaction> findByAccountNumber(String accountNumber);
}

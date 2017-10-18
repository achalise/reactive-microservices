package onlinebank.cashservice.repository;

import onlinebank.cashservice.model.CashAccount;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

/**
 * Created by achalise on 12/10/17.
 */
public interface CashAccountRepository extends ReactiveCrudRepository<CashAccount, String> {
}

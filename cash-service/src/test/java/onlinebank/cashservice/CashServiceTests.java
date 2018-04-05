package onlinebank.cashservice;

import onlinebank.cashservice.model.CashAccount;
import onlinebank.cashservice.model.Transaction;
import onlinebank.cashservice.repository.CashAccountRepository;
import onlinebank.cashservice.repository.TransactionRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.test.context.junit4.SpringRunner;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.math.BigDecimal;

@RunWith(SpringRunner.class)
public class CashServiceTests {
    @Mock
    CashAccountRepository cashAccountRepository;

    @Mock
    TransactionRepository transactionRepository;

    @InjectMocks
    CashAccountServiceImpl cashAccountService;

    @Test
    public void testRetrieveCashAccountSuccessful() {
        CashAccount testAccount = new CashAccount();
        Transaction testTransaction = new Transaction();
        testTransaction.setAccountNumber("111");
        testTransaction.setTransactionType("CREDIT");
        testTransaction.setAmount(new BigDecimal(300));

        testAccount.setAvailableBalance(1000);

        Mockito.when(cashAccountRepository.findByAccountNumber(Mockito.anyString())).thenReturn(Mono.just(testAccount));
        StepVerifier.create(cashAccountService.findByAccountNumber("123")).expectNextMatches(t -> t.getAvailableBalance() == 1000).verifyComplete();
        StepVerifier.create(cashAccountService.processTransaction(testTransaction)).expectNextMatches(t -> !!t).verifyComplete();

        // Verify that transactionRepository.save is called with the provided transaction
        Mockito.verify(transactionRepository, Mockito.times(1)).save(testTransaction);
    }
}

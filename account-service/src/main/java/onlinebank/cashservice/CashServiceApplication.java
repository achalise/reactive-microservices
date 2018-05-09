package onlinebank.cashservice;

import lombok.extern.java.Log;
import onlinebank.cashservice.model.CashAccount;
import onlinebank.cashservice.model.Transaction;
import onlinebank.cashservice.repository.CashAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import reactor.core.publisher.Flux;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.stream.IntStream;

@SpringBootApplication
@Log
public class CashServiceApplication {

    private static final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(2);


    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(CashServiceApplication.class, args);
        MessageProducer producer = context.getBean(MessageProducer.class);
    }


    @Bean
    CommandLineRunner runner(CashAccountRepository repository, MessageProducer producer) {
        //Creating test accounts
        List<CashAccount> accounts = new ArrayList<>();
        IntStream.range(0, 1).forEach(i -> accounts.add(buildCashAccount(i)));
        return (args) -> {
            repository.deleteAll()
                    .thenMany(repository.saveAll(accounts))
                    .thenMany(repository.findAll())
                    .subscribe(cashAccount -> {
                        System.out.println("The account retrieved: " + cashAccount);
                    });
            repository.findAll().subscribe(ca -> {
                createTestTransactions(producer, ca);
            });
        };
    }

    private void createTestTransactions(MessageProducer producer, CashAccount ca) {
        Flux<Transaction> transactions = Flux.create(sink -> {
            int count = 0;
            while (count++ < 5) {
                sink.next(Transaction.builder()
                        .transactionId(UUID.randomUUID().toString())
                        .accountNumber(ca.getAccountNumber())
                        .transactionType("CREDIT")
                        .amount(new BigDecimal(200 + count))
                        .description("Payment from ... " + count)
                        .build());
            }
            sink.complete();
        });
        transactions.subscribe(tx -> producer.sendMessage(tx));
    }

    private CashAccount buildCashAccount(int index) {
        String prefix = "" + (index == 1 ? 0 : index);
        return CashAccount.builder().accountName("Test User " + prefix)
                .accountNumber("CASH_125487" + index)
                .accountType("CASH")
                .balance(2000 + index)
                .interestRate(2.3 + index)
                .bsbCode("111234")
                .id(UUID.randomUUID().toString())
                .userId("user" + prefix)
                .availableBalance(100)
                .build();
    }

    @Bean
    public MessageProducer messageProducer() {
        return new MessageProducer();
    }

    public static class MessageProducer {
        @Value(value = "${message.topic.name}")
        private String topicName;

        @Autowired
        private KafkaTemplate<String, Transaction> kafkaTemplate;

        public void sendMessage(Transaction message) {
            log.info("Publishing transaction with amount" + message.getAmount());
            kafkaTemplate.send(topicName, message);
        }
    }


    @Bean
    RouterFunction<?> routes(RouteHandlers routeHandlers) {
        return RouterFunctions.route(RequestPredicates.GET("/accounts"), routeHandlers::all)
                .andRoute(RequestPredicates.GET("/account/{id}"), routeHandlers::byId)
                .andRoute(RequestPredicates.GET("/account/{id}/transactions"), routeHandlers::transactionsForAccount);

    }
}

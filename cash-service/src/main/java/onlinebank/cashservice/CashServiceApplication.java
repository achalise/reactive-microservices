package onlinebank.cashservice;

import onlinebank.cashservice.model.CashAccount;
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

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.stream.IntStream;

@SpringBootApplication
public class CashServiceApplication {

	private static final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(2);


	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(CashServiceApplication.class, args);
		MessageProducer producer = context.getBean(MessageProducer.class);
		KafkaTemplate<String, String> kafkaTemplate = producer.kafkaTemplate;
		System.out.println("The producer " + kafkaTemplate);


		IntStream.range(1, 100).forEach( i -> {
			producer.sendMessage("Sending message " + i);
			try {
				TimeUnit.SECONDS.sleep(1);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		});
		System.out.println("Successfully published all 100 messages ..");
	}


	@Bean
	CommandLineRunner runner(CashAccountRepository repository) {
		//Creating test accounts
		List<CashAccount> accounts = new ArrayList<>();
		IntStream.range(0, 3).forEach(i -> accounts.add(buildCashAccount(i)));
		return (s) -> {
			repository.deleteAll()
					.thenMany(repository.saveAll(accounts))
					.thenMany(repository.findAll())
					.subscribe(cashAccount -> {System.out.println("The account retrieved: " + cashAccount);});
		};
	}

	private CashAccount buildCashAccount(int index) {
		String prefix = "" + index;
		return CashAccount.builder().accountName("Test User " + prefix)
				.accountNumber("CASH_125487" + index)
				.accountType("CASH")
				.balance(2000 + index)
				.interestRate(2.3 + index)
				.bsbCode("111234")
				.id(UUID.randomUUID().toString())
				.userId("user" + prefix)
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
		private KafkaTemplate<String, String> kafkaTemplate;
		public void sendMessage(String message) {
			kafkaTemplate.send(topicName, message);
		}
	}


	@Bean
	RouterFunction<?> routes(RouteHandlers routeHandlers) {
		return RouterFunctions.route(RequestPredicates.GET("/all"), routeHandlers::all)
				.andRoute(RequestPredicates.GET("/account/{id}"), routeHandlers::byId);
	}
}

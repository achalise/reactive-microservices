package onlinebank.cardservice;

import onlinebank.cardservice.model.CardAccount;
import onlinebank.cardservice.repository.CardAccountRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@SpringBootApplication
public class CardServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CardServiceApplication.class, args);
	}

	@Bean
	RouterFunction<?> routes(RouteHandlers routeHandlers) {
		return RouterFunctions.route(RequestPredicates.GET("/all"), routeHandlers::all)
				.andRoute(RequestPredicates.GET("/account/{id}"), routeHandlers::byId);
	}


	@Bean
	CommandLineRunner runner(CardAccountRepository repository) {
		List<CardAccount> cardAccounts = testCardAccounts();
		return (s) -> {
			repository.deleteAll()
					.thenMany(repository.saveAll(cardAccounts))
					.thenMany(repository.findAll())
					.subscribe(cardAccount -> {System.out.println("CardAccount created: " + cardAccount);});
		};
	}

	private List<CardAccount> testCardAccounts() {
		List<CardAccount> accounts = new ArrayList<>();
		accounts.add(firstTestAccount());
		accounts.add(secondTestAccount());
		return accounts;
	}

	private CardAccount firstTestAccount() {
		CardAccount cardAccount = CardAccount.builder().accountType("CARD")
				.accountNumber("XXXXXXXXXXXX4237")
				.userId("user0")
				.bin("412389")
				.interestRate(9.5)
				.balance(2000)
				.accountName("Jo Doe")
				.id(UUID.randomUUID().toString())
				.availableBalance(3000)
				.build();
		return cardAccount;

	}

	private CardAccount secondTestAccount() {
		CardAccount cardAccount = CardAccount.builder().accountType("CARD")
				.accountNumber("XXXXXXXXXXXX1548")
				.userId("user0")
				.bin("543189")
				.interestRate(11.5)
				.balance(1200)
				.accountName("Jo Doe")
				.id(UUID.randomUUID().toString())
				.availableBalance(3800)
				.build();
		return cardAccount;

	}
}

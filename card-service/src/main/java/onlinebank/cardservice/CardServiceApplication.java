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
import java.util.stream.IntStream;

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
		List<CardAccount> cardAccounts = new ArrayList<>();
		IntStream.range(0, 3).forEach(i -> cardAccounts.add(buildCardAccount(i)));
		return (s) -> {
			repository.deleteAll()
					.thenMany(repository.saveAll(cardAccounts))
					.thenMany(repository.findAll())
					.subscribe(cardAccount -> {System.out.println("CardAccount created: " + cardAccount);});
		};
	}

	private CardAccount buildCardAccount(int i) {
		return CardAccount.builder().accountType("CARD")
				.accountName("Test User" + i)
				.accountNumber("XXXXXXXXXXXX4237")
				.userId("user" + i)
				.bin("423567")
				.interestRate(9.5 + i)
				.id(UUID.randomUUID().toString())
				.balance(2000 + i)
				.build();
	}

}

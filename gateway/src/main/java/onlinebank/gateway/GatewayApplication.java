package onlinebank.gateway;

import onlinebank.gateway.model.User;
import onlinebank.gateway.repository.UserRepository;
import org.jboss.aerogear.security.otp.api.Base32;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;

import java.util.Date;
import java.util.UUID;

@SpringBootApplication
public class GatewayApplication {

	@Value(value = "${cash.account.service}")
	private String cashAccountService;

	@Value(value = "${card.account.service}")
	private String cardAccountServiceUrl;

	@Bean(name = "cashAccountService")
	WebClient allAccountsRequest() {
		return WebClient.create(cashAccountService).mutate().build();
	}

	@Bean(name = "cardAccountService")
	WebClient allCardAccountsRequest() {
		return WebClient.create(cardAccountServiceUrl).mutate().build();
	}

	@Bean(name = "googleQrService")
	WebClient googleQrService() {
		return WebClient.create("https://chart.googleapis.com").mutate().build();
	}

	@Bean
	CommandLineRunner getALlAccounts(WebClient cashAccountService, WebClient cardAccountService, UserRepository userRepository) {
		return strings -> {
			userRepository.deleteAll().then(
					userRepository.save(User.builder()
							.userId("user0")
							.firstName("Joe")
							.lastName("Doe")
							.secret(Base32.random())
							.fingerPrint(null)
							.id(UUID.randomUUID().toString())
							.createdDate(new Date())
							.build()))
					.thenMany(userRepository.findAll())
					.subscribe(user -> System.out.println("User in the system " + user), error -> System.out.println(error));

			cashAccountService.get().uri("/accounts").retrieve().bodyToFlux(String.class).subscribe((acct) -> {
				System.out.println("The cash accounts in the system" + acct);
			}, err -> {
				System.out.println("Error occurred: "+ err);
			});
			cashAccountService.get().uri("/account/{id}", "accountid").retrieve().bodyToMono(String.class).subscribe(System.out::println);

			cardAccountService.get().uri("/accounts").retrieve().bodyToFlux(String.class).subscribe((acct) -> {
				System.out.println("The card accounts " +  acct);
			}, (error) -> {
				System.out.println("Error occurred retrieving card accounts " + error);
			});
			cardAccountService.get().uri("/account/{id}", "accountid").retrieve().bodyToMono(String.class).subscribe(System.out::println);
		};
	}

	@Configuration
	class WebConfiguration {
		@Bean
		RouterFunction<?> routes(AccountHandler handler, PaymentHandler paymentHandler, LoginHandler loginHandler) {
			return RouterFunctions.route(RequestPredicates.GET("/accounts"), handler::allAccounts)
					.andRoute(RequestPredicates.GET("/account/{source}/{id}"), handler::accountById)
					.andRoute(RequestPredicates.GET("/account/{source}/{id}/transactions"), handler::transactionsForAccount)
                    .andRoute(RequestPredicates.POST("/payment"), paymentHandler::makePayment)
                    .andRoute(RequestPredicates.POST("/login"), loginHandler::login);		}
	}

	public static void main(String[] args) {
		SpringApplication.run(GatewayApplication.class, args);
	}
}

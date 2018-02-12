package onlinebank.gateway;

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

	@Bean
	CommandLineRunner getALlAccounts(WebClient cashAccountService) {
		return strings -> {
			cashAccountService.get().uri("/all").retrieve().bodyToFlux(String.class).subscribe(System.out::println);
			cashAccountService.get().uri("/account/{id}", "accountid").retrieve().bodyToMono(String.class).subscribe(System.out::println);
		};
	}

	@Configuration
	class WebConfiguration {
		@Bean
		RouterFunction<?> routes(AccountHandler handler, PaymentHandler paymentHandler) {
			return RouterFunctions.route(RequestPredicates.GET("/all"), handler::allAccounts)
					.andRoute(RequestPredicates.GET("/account/{id}"), handler::accountById)
                    .andRoute(RequestPredicates.GET("/payment"), paymentHandler::makePayment);
		}
	}

	public static void main(String[] args) {
		SpringApplication.run(GatewayApplication.class, args);
	}
}

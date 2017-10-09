package onlinebank.cardservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;

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
}

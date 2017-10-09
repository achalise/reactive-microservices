package onlinebank.gateway;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Component
public class AccountHandler {

    private WebClient cashAccountService;

    private WebClient cardAccountService;

    public AccountHandler(WebClient cashAccountService, WebClient cardAccountService) {
        this.cashAccountService = cashAccountService;
        this.cardAccountService = cardAccountService;
    }

    Mono<ServerResponse> accountById(ServerRequest request) {
        Mono<String> account = cashAccountService.get().uri("/account/{id}", "accountid").retrieve().bodyToMono(String.class);
        return ServerResponse.ok().body(account, String.class);
    }

    Mono<ServerResponse> allAccounts(ServerRequest request) {
        Flux<String> accounts = cashAccountService.get().uri("/all").retrieve().bodyToFlux(String.class);
        Flux<String> cardAccounts = cardAccountService.get().uri("/all").retrieve().bodyToFlux(String.class);
        Flux<String> allAccounts = accounts.mergeWith(cardAccounts);
        return ServerResponse.ok().contentType(MediaType.TEXT_EVENT_STREAM).body(allAccounts, String.class);
    }
}

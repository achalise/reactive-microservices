package onlinebank.cashservice;

import onlinebank.cashservice.model.CashAccount;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;

/**
 * Created by achalise on 4/10/17.
 */

@Component
public class RouteHandlers {

    public Mono<ServerResponse> byId(ServerRequest serverRequest) {
        CashAccount.builder().accountName("").macId("mac").build();
        return ServerResponse.ok().body(Mono.just(CashAccount.builder().accountName("TestName")
                .availableBalance(100)
                .balance(120)
                .build()), CashAccount.class);
    }

    public Mono<ServerResponse> all(ServerRequest serverRequest) {
        CashAccount[] theValues = new CashAccount[] {new CashAccount(), new CashAccount()};
        Flux<CashAccount> flux = Flux.fromArray(theValues).delayElements(Duration.ofSeconds(1));
        return ServerResponse.ok().contentType(MediaType.TEXT_EVENT_STREAM).body(flux, CashAccount.class);
    }

}

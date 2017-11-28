package onlinebank.cashservice;

import onlinebank.cashservice.model.CashAccount;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Created by achalise on 4/10/17.
 */

@Component
public class RouteHandlers {

    private CashAccountService cashAccountService;

    public RouteHandlers(CashAccountService cashAccountService) {
        this.cashAccountService = cashAccountService;
    }

    public Mono<ServerResponse> byId(ServerRequest serverRequest) {
        //TODO get account number from server request, and validate that the user has access to it
        String accountId = serverRequest.pathVariable("id");
        Mono<CashAccount> accountById = cashAccountService.findById(accountId);
        return ServerResponse.ok().body(accountById, CashAccount.class);
    }

    public Mono<ServerResponse> all(ServerRequest serverRequest) {
        CashAccount[] theValues = new CashAccount[] {new CashAccount(), new CashAccount()};
        //TODO get user from the auth token
        Flux<CashAccount> flux = cashAccountService.findByUserId("user0");
        return ServerResponse.ok().contentType(MediaType.TEXT_EVENT_STREAM).body(flux, CashAccount.class);
    }

}

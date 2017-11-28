package onlinebank.cardservice;

import onlinebank.cardservice.model.CardAccount;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Created by achalise on 9/10/17.
 */

@Component
public class RouteHandlers {

    private Logger logger = LoggerFactory.getLogger(RouteHandlers.class);

    @Autowired
    private CardAccountService cardAccountService;

    public Mono<ServerResponse> byId(ServerRequest serverRequest) {
        String id =  serverRequest.pathVariable("id");
        logger.info("Retrieving account for id {}", id);

        Mono<CardAccount> account = cardAccountService.findById(id);

        return ServerResponse.ok().body(account, CardAccount.class);
    }

    public Mono<ServerResponse> all(ServerRequest serverRequest) {
        final Flux<CardAccount> accounts = cardAccountService.findByUserId("jdoe");
//        return ServerResponse.ok().contentType(MediaType.TEXT_EVENT_STREAM).body(accounts, CardAccount.class);
        //TODO create a response object for representing response data along with status and error flags
        return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(accounts, CardAccount.class);
    }
}

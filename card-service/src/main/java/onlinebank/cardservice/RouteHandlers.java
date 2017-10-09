package onlinebank.cardservice;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;

/**
 * Created by achalise on 9/10/17.
 */

@Component
public class RouteHandlers {
    public Mono<ServerResponse> byId(ServerRequest serverRequest) {
        return ServerResponse.ok().body(Mono.just("A Single mono card account response"), String.class);
    }

    public Mono<ServerResponse> all(ServerRequest serverRequest) {
        String[] theValues = new String[]{"First card account value", "Second card account value", "Third card account value", "Fourth card account value"};
        Flux<String> flux = Flux.fromArray(theValues).delayElements(Duration.ofSeconds(1));
        return ServerResponse.ok().contentType(MediaType.TEXT_EVENT_STREAM).body(flux, String.class);
    }
}

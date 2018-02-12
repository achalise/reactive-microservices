package onlinebank.gateway;

import onlinebank.gateway.model.PaymentResponse;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.util.Date;

@Component
public class PaymentHandler {
    Mono<ServerResponse> makePayment(ServerRequest request) {
        PaymentResponse resp = new PaymentResponse("SUCCESS", null, "1234_RECEIPT", new Date());
        return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(Mono.just(resp), PaymentResponse.class);
    }
}

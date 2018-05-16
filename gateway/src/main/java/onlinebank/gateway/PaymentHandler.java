package onlinebank.gateway;

import onlinebank.gateway.model.PaymentRequest;
import onlinebank.gateway.model.PaymentResponse;
import onlinebank.gateway.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.util.Date;
import java.util.UUID;

@Component
public class PaymentHandler {

    @Autowired
    private TransactionPublisher transactionPublisher;

    Mono<ServerResponse> makePayment(ServerRequest request) {
        Mono<PaymentRequest> mono = request.bodyToMono(PaymentRequest.class);
        return mono.map(this::convertToTransaction)
            .log()
            .flatMap(this::publishTransaction)
            .flatMap(paymentResponse -> ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(Mono.just(paymentResponse), PaymentResponse.class));

    }

    private Mono<PaymentResponse> publishTransaction(Transaction transaction) {
        transactionPublisher.publish(transaction);
        PaymentResponse resp = new PaymentResponse("SUCCESS", null, transaction.getTransactionId(), new Date());
        return Mono.just(resp);
    }

    private Transaction convertToTransaction(PaymentRequest paymentRequest) {
        Transaction tx = Transaction.builder().toAccount(paymentRequest.getToAccountNumber())
                .description(paymentRequest.getDescription())
                .amount(paymentRequest.getAmount())
                .accountNumber(paymentRequest.getFromAccountNumber())
                .transactionType("DEBIT")
                .transactionId(UUID.randomUUID().toString())
                .build();

        return tx;
    }
}

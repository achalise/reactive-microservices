package onlinebank.gateway;

import onlinebank.gateway.model.PaymentRequest;
import onlinebank.gateway.model.Transaction;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;

import java.math.BigDecimal;

@RunWith(SpringRunner.class)
public class PaymentHandlerTest {

    @Mock
    private TransactionPublisher transactionPublisher;

    @InjectMocks
    private PaymentHandler paymentHandler;

    private final RouterFunction routerFunction() {
        return RouterFunctions.route(RequestPredicates.POST("/payment"), paymentHandler::makePayment);
    }

    @Test
    public void testWebTestClientWithRouterFunction() {
        PaymentRequest req = new PaymentRequest();
        req.setAccountNumber("123");
        req.setAmount(new BigDecimal(100));
        req.setDescription("Payment ");
        req.setToAccount("4555");

        WebTestClient.bindToRouterFunction(routerFunction())
                .build()
                .post().uri("/payment")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromObject(req))
                .exchange()
                .expectStatus().isOk()
                .expectBody(String.class);

        Mockito.verify(transactionPublisher, Mockito.times(1)).publish(Mockito.any(Transaction.class));
    }

}

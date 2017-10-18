package onlinebank.cashservice;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.WebServer;
import org.springframework.context.ApplicationContext;
import org.springframework.mock.web.reactive.function.server.MockServerRequest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.reactive.server.FluxExchangeResult;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

/**
 * Created by achalise on 11/10/17.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class WebIntegrationTest {


    private WebTestClient client;
    private static WebServer server;

    @Autowired
    ApplicationContext applicationContext;

    @Autowired
    RouteHandlers routeHandlers;

    @Autowired
    RouterFunction<?> routerFunction;

    @Before
    public void setUp() {
        client = WebTestClient.bindToRouterFunction(routerFunction).build();
    }

    @Test
    public void testExample() {
        FluxExchangeResult<String> result = client.get().uri("/all").exchange().returnResult(String.class);
        StepVerifier.create(result.getResponseBody()).expectNext("A Single mono Response").expectComplete().verify();
//        result.getResponseBody().subscribe(System.out::println);
    }

    @Test
    public void secondTest() {
        Mono<ServerResponse> serverResponse = routeHandlers.byId(MockServerRequest.builder().build());
        serverResponse.subscribe(System.out::println);
        StepVerifier.create(serverResponse).consumeNextWith(System.out::println);
        System.out.println("Tested the response");
    }
}

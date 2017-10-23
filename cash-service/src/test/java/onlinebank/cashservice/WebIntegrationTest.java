package onlinebank.cashservice;

import onlinebank.cashservice.model.CashAccount;
import org.hamcrest.Matchers;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.WebServer;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.reactive.server.FluxExchangeResult;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.web.reactive.function.server.RouterFunction;

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
        result.getResponseBody().subscribe(s -> {
           Assert.assertTrue("It has correct userId", s.contains("user0"));
        });
    }

    @Test
    public void secondTest() {
        FluxExchangeResult<CashAccount> result = client.get().uri("/account/CASH_1254870").exchange().returnResult(CashAccount.class);
        result.getResponseBody().subscribe(cashAccount -> {
            Assert.assertThat("Account number should be equal", cashAccount.getAccountNumber(), Matchers.equalTo("CASH_1254870"));
        });
    }
}

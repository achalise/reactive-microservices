package onlinebank.gateway;

import onlinebank.gateway.model.AccountList;
import onlinebank.gateway.model.CardAccount;
import onlinebank.gateway.model.CashAccount;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.util.List;

@Component
public class AccountHandler {

    private Logger logger = LoggerFactory.getLogger(AccountHandler.class);

    private WebClient cashAccountService;

    private WebClient cardAccountService;

    public AccountHandler(WebClient cashAccountService, WebClient cardAccountService) {
        this.cashAccountService = cashAccountService;
        this.cardAccountService = cardAccountService;
    }

    Mono<ServerResponse> accountById(ServerRequest request) {
        String accountId = request.pathVariable("id");
        Mono<String> account = cashAccountService.get().uri("/account/{id}", accountId).retrieve().bodyToMono(String.class);
        return ServerResponse.ok().body(account, String.class);
    }

    Mono<ServerResponse> allAccounts(ServerRequest request) {
        Mono<List<CashAccount>> cashAccountList = cashAccountService.get().uri("/all").retrieve().bodyToFlux(CashAccount.class).collectList();
        Mono<List<CardAccount>> cardAccountList = cardAccountService.get().uri("/all").retrieve().bodyToFlux(CardAccount.class).collectList();
        Mono<AccountList> mono = cashAccountList.zipWith(cardAccountList, (cash, card) -> {
            AccountList accountList = new AccountList();
            accountList.setCashAccounts(cash);
            accountList.setCardAccounts(card);
            return accountList;
        });

        return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(mono, AccountList.class);
    }

}

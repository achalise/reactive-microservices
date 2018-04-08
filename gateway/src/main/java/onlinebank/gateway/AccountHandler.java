package onlinebank.gateway;

import onlinebank.gateway.model.Account;
import onlinebank.gateway.model.AccountList;
import onlinebank.gateway.model.CardAccount;
import onlinebank.gateway.model.CashAccount;
import onlinebank.gateway.model.Transaction;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Component
public class AccountHandler {

    private WebClient cashAccountService;

    private WebClient cardAccountService;



    public AccountHandler(WebClient cashAccountService, WebClient cardAccountService, WebClient googleQrService) {
        this.cashAccountService = cashAccountService;
        this.cardAccountService = cardAccountService;
    }

    Mono<ServerResponse> accountById(ServerRequest request) {
        String source = request.pathVariable("source");
        String accountId = request.pathVariable("id");
        Mono<Account> account = getAccount(accountId, source);
        return ServerResponse.ok().body(account, Account.class);
    }

    Mono<ServerResponse> transactionsForAccount(ServerRequest request) {
        String source = request.pathVariable("source");
        String accountId = request.pathVariable("id");
        Flux<Transaction> transactions = getTransactions(accountId, source);
        return ServerResponse.ok().body(transactions, Transaction.class);
    }

    private Flux<Transaction> getTransactions(String accountId, String source) {
        // TODO refactor this
        if (source.equals("card")) {
            return cardAccountService.get().uri("/account/{accountId}/transactions", accountId).retrieve().bodyToFlux(Transaction.class);
        } else if (source.equals("cash")) {
            return cashAccountService.get().uri("/account/{accountId}/transactions", accountId).retrieve().bodyToFlux(Transaction.class);
        } else {
            throw new IllegalArgumentException("Invalid source [ " + source + " ] ");
        }
    }

    private Mono<Account> getAccount(String accountId, String source) {
        if (source.equals("cash")) {
            return cashAccountService.get().uri("/account/{id}", accountId).retrieve().bodyToMono(Account.class);
        } else if (source.equals("card")) {
            return cardAccountService.get().uri("/account/{id}", accountId).retrieve().bodyToMono(Account.class);
        } else {
            //TODO return mono of empty when the source system is invalid
            throw new IllegalArgumentException("Source system [ " + source + " ] not valid");
        }
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

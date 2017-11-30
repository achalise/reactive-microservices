package onlinebank.gateway.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Created by achalise on 30/11/17.
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
public class AccountList {
    List<CashAccount> cashAccounts;
    List<CardAccount> cardAccounts;
}
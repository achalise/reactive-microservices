package onlinebank.gateway.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

/**
 * Created by achalise on 30/11/17.
 */
@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class CashAccount {
    private String id;
    private String userId;
    private String accountNumber;
    private String bsbCode;
    private String accountName;
    private long balance;
    private long availableBalance;
    private String accountType;
    private double interestRate;
}

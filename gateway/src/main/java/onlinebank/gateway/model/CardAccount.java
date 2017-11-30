package onlinebank.gateway.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

/**
 * Created by achalise on 30/11/17.
 */
@Data
@Builder
@AllArgsConstructor
public class CardAccount {
    private String id;
    private String userId;
    private String bin;
    private String accountNumber;
    private String accountName;
    private long balance;
    private long availableBalance;
    private String accountType;
    private double interestRate;

}


package onlinebank.gateway.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Account {
    private String id;
    private String userId;
    private String accountNumber;
    private String accountName;
    private String bin;
    private String bsbCode;
    private long balance;
    private long availableBalance;
    private String accountType;
    private double interestRate;
}

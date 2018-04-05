package onlinebank.gateway.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Transaction {
    private String transactionId;
    private String accountNumber;
    private String toAccount;
    private BigDecimal amount;
    private String description;
    private String transactionType;
    private BigDecimal balance;
}

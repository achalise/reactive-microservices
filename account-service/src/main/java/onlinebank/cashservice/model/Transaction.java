package onlinebank.cashservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Document
@Builder
public class Transaction {
    @Id
    private String transactionId;
    private String accountNumber;
    private String toAccount;
    private BigDecimal amount;
    private String description;
    private String transactionType;
    private BigDecimal balance;
}

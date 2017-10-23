package onlinebank.cashservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Document
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

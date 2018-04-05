package onlinebank.gateway.model;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PaymentRequest {
    private String accountNumber;
    private String toAccount;
    private String billerCode;
    private String billerReference;
    private BigDecimal amount;
    private String description;
    private String transactionType;
}

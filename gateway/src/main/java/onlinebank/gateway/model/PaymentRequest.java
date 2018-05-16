package onlinebank.gateway.model;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class PaymentRequest {
    private String fromAccountId;
    private Date paymentDate;
    private String fromAccountType;
    private String fromAccountNumber;
    private String toAccountName;
    private String toAccountBsb;
    private String toAccountNumber;
    private String billerCode;
    private String billerReference;
    private BigDecimal amount;
    private String description;
    private String paymentType;
    private String transactionType;
}

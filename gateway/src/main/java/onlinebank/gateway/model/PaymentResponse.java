package onlinebank.gateway.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PaymentResponse {
    private String status;
    private String errorCode;
    private String transactionId;
    private Date transactionDateTime;
}

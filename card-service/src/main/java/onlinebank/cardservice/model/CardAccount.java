package onlinebank.cardservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by achalise on 24/10/17.
 */

@Data
@Builder
@Document
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

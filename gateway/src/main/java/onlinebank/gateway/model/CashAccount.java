package onlinebank.gateway.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

/**
 * Created by achalise on 30/11/17.
 */
@Data
@RequiredArgsConstructor
@AllArgsConstructor
//@Builder
public class CashAccount extends Account {
    private String bsbCode;
}

package onlinebank.gateway.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

/**
 * Created by achalise on 30/11/17.
 */
@Data
//@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class CardAccount extends Account {
    private String bin;
}


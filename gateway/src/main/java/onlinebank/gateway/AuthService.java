package onlinebank.gateway;

import onlinebank.gateway.model.LoginRequest;
import onlinebank.gateway.model.LoginResponse;
import reactor.core.publisher.Mono;

public interface AuthService {
    Mono<LoginResponse> validateUser(LoginRequest request);
}

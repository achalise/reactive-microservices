package onlinebank.gateway;

import onlinebank.gateway.model.LoginRequest;
import onlinebank.gateway.model.LoginResponse;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Component
public class LoginHandler {

    private AuthService authService;

    public LoginHandler(AuthService authService) {
        this.authService = authService;
    }

    public Mono<ServerResponse> login(ServerRequest request) {
        Mono<LoginRequest> loginReuest = request.bodyToMono(LoginRequest.class);
        return loginReuest.flatMap(req -> authService.validateUser(req))
                .log()
                .flatMap(loginResponse -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(Mono.just(loginResponse), LoginResponse.class));
    }
}

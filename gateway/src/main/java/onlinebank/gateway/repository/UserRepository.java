package onlinebank.gateway.repository;

import onlinebank.gateway.model.User;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Mono;

public interface UserRepository extends ReactiveCrudRepository<User, String>{
    Mono<User> findByUserId(String userId);
}

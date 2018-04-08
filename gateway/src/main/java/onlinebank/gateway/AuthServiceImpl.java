package onlinebank.gateway;

import onlinebank.gateway.model.LoginRequest;
import onlinebank.gateway.model.LoginResponse;
import onlinebank.gateway.model.User;
import onlinebank.gateway.repository.UserRepository;
import org.jboss.aerogear.security.otp.Totp;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Component
public class AuthServiceImpl implements AuthService {

    private WebClient googleQrService;

    private UserRepository userRepository;

    public AuthServiceImpl(WebClient googleQrService, UserRepository userRepository) {
        this.googleQrService = googleQrService;
        this.userRepository = userRepository;
    }

    @Override
    public Mono<LoginResponse> validateUser(LoginRequest request) {
        return userRepository.findByUserId(request.getUserId()).switchIfEmpty(Mono.just(new User()))
                .flatMap(user -> this.validate(user, request));
    }

    private Mono<LoginResponse> validate(User user, LoginRequest request) {
        if(StringUtils.isEmpty(user.getUserId())) {
            return Mono.just(LoginResponse.builder().status("ERROR").message("Invalid userid or password").build());
        } else if (StringUtils.isEmpty(user.getFingerPrint()) && StringUtils.isEmpty(request.getVerificationCode())) {
            user.setFingerPrint(request.getFingerPrint());
            userRepository.save(user)
                    .subscribe(s -> System.out.println("User saved" + user),
                            error -> System.out.println("Error when saving the browser signature for user " + error));
            return generateQrCode(user.getSecret()).map(bytes -> LoginResponse.builder().status("AUTHENTICATED_2FA").message("Please save the secret by scanning the qrcode into your GoogleAuthenticator, which you can then use to generate verification code for login").qrData(bytes).build());
        } else {
            if(!user.getFingerPrint().equals(request.getFingerPrint())) {
                Totp totp = new Totp(user.getSecret());
                String verificationCode = StringUtils.isEmpty(request.getVerificationCode()) ? "1" : request.getVerificationCode();
                boolean valid = totp.verify(verificationCode);
                if (!valid) {
                    return Mono.just(LoginResponse.builder().status("AUTHENTICATED_2FA").message("Invalid verification code, please enter again").build());
                }
            }
            return Mono.just(LoginResponse.builder().status("SUCCESS").message(null).build());
        }
    }

    private Mono<byte[]> generateQrCode(String secret) {
        String qparam = String.format(
                "otpauth://totp/%s:%s?secret=%s&issuer=%s",
                "EBANKING", "achalis@gmail.com", secret, "EBANKING");

        Mono<byte[]> qrCode = googleQrService.get().uri(uriBuilder -> uriBuilder.path("/chart")
                .queryParam("chs", "200x200")
                .queryParam("chld", "M%%7C0")
                .queryParam("cht", "qr")
                .queryParam("chl", qparam)
                .build()).retrieve().bodyToMono(byte[].class);
        return qrCode;
    }

}

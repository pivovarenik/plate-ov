package by.tarasovna.auth.controller;

import by.tarasovna.auth.dto.LoginRequest;
import by.tarasovna.auth.dto.LoginResponse;
import by.tarasovna.common.dto.ApiResponse;
import by.tarasovna.modules.users.entity.User;
import by.tarasovna.modules.users.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        log.info("Login attempt for email: {}", request.getEmail());

        try {
            String token = userService.validateAndGenerateToken(request.getEmail(), request.getPassword());
            User user = userService.findByEmail(request.getEmail());

            LoginResponse response = LoginResponse.builder()
                    .userId(user.getId())
                    .email(user.getEmail())
                    .fullName(user.getFullName())
                    .role(user.getRole())
                    .token(token)
                    .tokenType("Bearer")
                    .build();

            return ResponseEntity.ok(ApiResponse.ok(response, "Login successful"));
        } catch (Exception e) {
            log.error("Login failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("INVALID_CREDENTIALS", "Invalid email or password"));
        }
    }

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<String>> health() {
        return ResponseEntity.ok(ApiResponse.ok("OK", "Service is running"));
    }
}

package by.tarasovna.auth.dto;

import by.tarasovna.common.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse implements Serializable {
    private Long userId;
    private String email;
    private String fullName;
    private UserRole role;
    private String token;
    private String tokenType;
}

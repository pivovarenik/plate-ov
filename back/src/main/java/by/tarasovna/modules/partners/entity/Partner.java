package by.tarasovna.modules.partners.entity;

import by.tarasovna.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "partners", indexes = {
    @Index(name = "idx_partner_email", columnList = "email"),
    @Index(name = "idx_partner_company", columnList = "companyName")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Partner extends BaseEntity {

    @NotBlank
    @Column(nullable = false)
    private String companyName;

    @Column(nullable = false)
    private String contactPerson;

    @NotBlank
    @Email
    @Column(nullable = false)
    private String email;

    @Column(length = 20)
    private String phone;

    @Column(nullable = false)
    private String partnerType; // RESELLER, DISTRIBUTOR, AFFILIATE, etc.

    @Column(length = 500)
    private String address;

    @Column(precision = 19, scale = 2)
    @Builder.Default
    private BigDecimal annualVolume = BigDecimal.ZERO;

    @Column(length = 50)
    @Builder.Default
    private String status = "ACTIVE";

    @Builder.Default
    private boolean active = true;
}

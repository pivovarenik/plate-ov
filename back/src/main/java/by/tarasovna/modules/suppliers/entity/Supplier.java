package by.tarasovna.modules.suppliers.entity;

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
@Table(name = "suppliers", indexes = {
    @Index(name = "idx_supplier_email", columnList = "email"),
    @Index(name = "idx_supplier_company", columnList = "companyName")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Supplier extends BaseEntity {

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

    @Column(length = 500)
    private String address;

    @Column(length = 50)
    private String city;

    @Column(length = 50)
    private String country;

    @Column(length = 50)
    private String paymentTerms;

    @Column(precision = 19, scale = 2)
    @Builder.Default
    private BigDecimal totalOrderValue = BigDecimal.ZERO;

    @Column(length = 50)
    @Builder.Default
    private String status = "ACTIVE";

    @Builder.Default
    private boolean active = true;
}

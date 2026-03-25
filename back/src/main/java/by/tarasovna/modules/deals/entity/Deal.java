package by.tarasovna.modules.deals.entity;

import by.tarasovna.common.entity.BaseEntity;
import by.tarasovna.common.enums.DealStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "deals", indexes = {
    @Index(name = "idx_customer", columnList = "customer_id"),
    @Index(name = "idx_status", columnList = "status")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Deal extends BaseEntity {

    @NotBlank
    @Column(nullable = false)
    private String title;

    @Column(length = 500)
    private String description;

    @NotNull
    @Column(nullable = false)
    private Long customerId;

    @NotNull
    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal value;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private DealStatus status = DealStatus.LEAD;

    @Column(nullable = false)
    private LocalDate expectedCloseDate;

    @Column
    private Integer probability;

    @Column
    private Long assignedUserId;

    @Column(length = 50)
    private String source;

    public String getFormattedValue() {
        return String.format("%.2f", value);
    }
}

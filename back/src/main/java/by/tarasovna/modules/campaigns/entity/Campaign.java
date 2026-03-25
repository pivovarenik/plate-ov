package by.tarasovna.modules.campaigns.entity;

import by.tarasovna.common.entity.BaseEntity;
import by.tarasovna.common.enums.CampaignStatus;
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
@Table(name = "campaigns", indexes = {
    @Index(name = "idx_status", columnList = "status"),
    @Index(name = "idx_campaign_type", columnList = "type")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Campaign extends BaseEntity {

    @NotBlank
    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private CampaignStatus status = CampaignStatus.DRAFT;

    @Column(nullable = false)
    private String type; // EMAIL, SMS, SOCIAL, etc.

    @Column
    private LocalDate startDate;

    @Column
    private LocalDate endDate;

    @Column(precision = 19, scale = 2)
    @Builder.Default
    private BigDecimal budget = BigDecimal.ZERO;

    @Column
    @Builder.Default
    private Integer targetAudience = 0;

    @Column
    @Builder.Default
    private Integer responseCount = 0;

    @Column
    private Long createdByUserId;

    @Column(length = 50)
    @Builder.Default
    private String segment = "ALL";
}

package by.tarasovna.modules.interactions.entity;

import by.tarasovna.common.entity.BaseEntity;
import by.tarasovna.common.enums.InteractionType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "interactions", indexes = {
    @Index(name = "idx_customer", columnList = "customer_id"),
    @Index(name = "idx_type", columnList = "type")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Interaction extends BaseEntity {

    @NotNull
    @Column(nullable = false)
    private Long customerId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private InteractionType type;

    @NotBlank
    @Column(length = 500, nullable = false)
    private String content;

    @Column(nullable = false)
    private LocalDateTime interactionDateTime;

    @Column
    private Long userId;

    @Column
    private Long dealId;

    @Column(length = 100)
    private String direction; // INBOUND, OUTBOUND
}

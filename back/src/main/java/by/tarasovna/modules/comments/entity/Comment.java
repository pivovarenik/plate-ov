package by.tarasovna.modules.comments.entity;

import by.tarasovna.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "comments", indexes = {
    @Index(name = "idx_entity_type", columnList = "entityType"),
    @Index(name = "idx_entity_id", columnList = "entityId")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Comment extends BaseEntity {

    @NotBlank
    @Column(length = 500, nullable = false)
    private String content;

    @NotNull
    @Column(nullable = false)
    private Long entityId;

    @NotBlank
    @Column(nullable = false)
    private String entityType; // CUSTOMER, DEAL, ORDER, etc.

    @NotNull
    @Column(nullable = false)
    private Long createdByUserId;

    @Column(length = 50)
    @Builder.Default
    private String status = "ACTIVE";
}

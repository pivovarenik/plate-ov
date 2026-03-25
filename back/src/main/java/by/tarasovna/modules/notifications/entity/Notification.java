package by.tarasovna.modules.notifications.entity;

import by.tarasovna.common.entity.BaseEntity;
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
@Table(name = "notifications", indexes = {
        @Index(name = "idx_user", columnList = "user_id"),
        @Index(name = "idx_is_read", columnList = "is_read")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Notification extends BaseEntity {

    @NotNull
    @Column(nullable = false)
    private Long userId;

    @NotBlank
    @Column(length = 500, nullable = false)
    private String title;

    @Column(length = 1000)
    private String message;

    @Column(length = 50)
    @Builder.Default
    private String type = "INFO";

    @Column(name = "is_read")
    @Builder.Default
    private boolean isRead = false;

    @Column
    private LocalDateTime readAt;

    @Column
    private Long relatedEntityId;

    @Column(length = 50)
    private String relatedEntityType;
}

package by.tarasovna.modules.tasks.entity;

import by.tarasovna.common.entity.BaseEntity;
import by.tarasovna.common.enums.TaskPriority;
import by.tarasovna.common.enums.TaskStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "tasks", indexes = {
    @Index(name = "idx_assigned_user", columnList = "assigned_user_id"),
    @Index(name = "idx_status", columnList = "status")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Task extends BaseEntity {

    @NotBlank
    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private TaskStatus status = TaskStatus.OPEN;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private TaskPriority priority = TaskPriority.MEDIUM;

    @NotNull
    @Column(nullable = false)
    private Long assignedUserId;

    @Column
    private LocalDate dueDate;

    @Column
    private Long relatedCustomerId;

    @Column
    private Long relatedDealId;

    @Column(length = 50)
    @Builder.Default
    private String category = "GENERAL";
}

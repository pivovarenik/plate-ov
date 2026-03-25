package by.tarasovna.modules.settings.entity;

import by.tarasovna.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "system_settings", indexes = {
    @Index(name = "idx_key", columnList = "settingKey")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class SystemSetting extends BaseEntity {

    @NotBlank
    @Column(nullable = false, unique = true)
    private String settingKey;

    @NotBlank
    @Column(nullable = false)
    private String settingValue;

    @Column(length = 500)
    private String description;

    @Column(length = 50)
    @Builder.Default
    private String category = "GENERAL";

    @Column(length = 20)
    @Builder.Default
    private String dataType = "STRING"; // STRING, INTEGER, BOOLEAN, DECIMAL
}

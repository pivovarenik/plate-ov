package by.tarasovna.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PageRequest implements Serializable {
    @Builder.Default
    private int page = 0;
    @Builder.Default
    private int size = 20;
    private String search;
    private String sortBy;
    @Builder.Default
    private String sortOrder = "DESC";
}

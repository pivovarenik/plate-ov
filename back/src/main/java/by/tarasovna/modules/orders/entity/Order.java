package by.tarasovna.modules.orders.entity;

import by.tarasovna.common.entity.BaseEntity;
import by.tarasovna.common.enums.OrderStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "orders", indexes = {
    @Index(name = "idx_customer", columnList = "customer_id"),
    @Index(name = "idx_status", columnList = "status")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Order extends BaseEntity {

    @NotNull
    @Column(nullable = false)
    private Long customerId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private OrderStatus status = OrderStatus.PENDING;

    @NotNull
    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal totalAmount;

    @Column(precision = 19, scale = 2)
    @Builder.Default
    private BigDecimal tax = BigDecimal.ZERO;

    @Column(nullable = false)
    @Builder.Default
    private LocalDate orderDate = LocalDate.now();

    @Column
    private LocalDate expectedDeliveryDate;

    @Column
    private LocalDate actualDeliveryDate;

    @Column(length = 50)
    private String trackingNumber;

    @Column(length = 500)
    private String shippingAddress;

    @Column
    private Long assignedUserId;
}

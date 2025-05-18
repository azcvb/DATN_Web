package com.datn.sellWatches.DTO.Request.Order;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateStatusOrderRequest {
    Boolean status;
    String orderId;
}

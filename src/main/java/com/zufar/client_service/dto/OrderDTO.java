package com.zufar.client_service.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {

    private Long id;
    private String goodsName;
    private Category category;
    private Long clientId;
}

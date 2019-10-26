package com.zufar.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@ApiModel("Order")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @ApiModelProperty(notes = "Order id", name = "id", required = true)
    private Long id;

    @ApiModelProperty(notes = "Order goods name", name = "goodsName", required = true)
    private String goodsName;

    @ApiModelProperty(notes = "Order category", name = "category", required = true)
    private Category category;

    @ApiModelProperty(notes = "Order client id", name = "clientId", required = true)
    private Long clientId;
}

package com.zufar.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class Order implements Serializable {

    private Long id;
    private String goodsName;
    private Category category;
    private Long clientId;
}

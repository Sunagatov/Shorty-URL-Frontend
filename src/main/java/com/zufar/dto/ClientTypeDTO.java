package com.zufar.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@ApiModel("Client type")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientTypeDTO {

    @ApiModelProperty(notes = "Client type's id", name="id", required=true)
    private Long id;

    @ApiModelProperty(notes = "Client type's short name", name="shortName", required=true)
    private String shortName;

    @ApiModelProperty(notes = "Client type's full name", name="fullName", required=true)
    private String fullName;

    @ApiModelProperty(notes = "Client type's code", name="typeCode", required=true)
    private String typeCode;
}

package com.zufar.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;
import java.time.LocalDateTime;

@ApiModel("Client")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientResponseDTO {

    @ApiModelProperty(notes = "Client id", name = "id", required = true)
    private Long id;

    @ApiModelProperty(notes = "Client's short name", name = "shortName", required = true)
    private String shortName;

    @ApiModelProperty(notes = "Client's full name", name = "fullName", required = true)
    private String fullName;

    @ApiModelProperty(notes = "Client's type", name = "clientType", required = true)
    private ClientTypeDTO clientType;

    @ApiModelProperty(notes = "Client's inn", name = "inn", required = true)
    private String inn;

    @ApiModelProperty(notes = "Client's okpo", name = "okpo")
    private String okpo;

    @ApiModelProperty(notes = "Client's orders", name = "orders")
    private List<OrderDTO> orders;

    @ApiModelProperty(notes = "Client's creation date", name = "creationDate", required = true)
    private LocalDateTime creationDate;

    @ApiModelProperty(notes = "Client's modification date", name = "modificationDate", required = true)
    private LocalDateTime modificationDate;
}

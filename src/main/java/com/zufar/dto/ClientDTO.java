package com.zufar.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.List;

@ApiModel("Client")
@Data
public class ClientDTO {

    @ApiModelProperty(notes = "Client id", name = "id")
    private Long id;

    @ApiModelProperty(notes = "Client's short name", name = "shortName", required = true)
    @NotEmpty(message = "Please provide a client's short name. It is empty.")
    @NotNull(message = "Please provide a client's short name. It is absent.")
    @Size(min = 5, max = 60, message = "A client's short name length should be from 5 to 60.")
    private String shortName;

    @ApiModelProperty(notes = "Client's full name", name = "fullName", required = true)
    @NotEmpty(message = "Please provide a client's full name. It is empty.")
    @NotNull(message = "Please provide a client's full name. It is absent.")
    @Size(min = 5, max = 255, message = "A client's short name length should be from 5 to 255.")
    private String fullName;

    @ApiModelProperty(notes = "Client's type id", name = "clientTypeId", required = true)
    @NotNull(message = "Please provide a client's type id.")
    private Long clientTypeId;

    @ApiModelProperty(notes = "Client inn", name = "inn", required = true)
    @NotEmpty(message = "Please provide a client's inn. It is empty.")
    @NotNull(message = "Please provide a client's inn. It is absent.")
    @Size(min = 5, max = 12, message = "A client's short name length should be from 5 to 12.")
    private String inn;

    @ApiModelProperty(notes = "Client okpo", name = "okpo")
    @Size(min = 5, max = 10, message = "A client's short name length should be from 5 to 10.")
    private String okpo;

    @ApiModelProperty(notes = "Order's ids of a client", name = "orderIds")
    private List<Long> orderIds;

    @ApiModelProperty(notes = "Client's creation date", name = "creationDate", required = true)
    private LocalDateTime creationDate;

    @ApiModelProperty(notes = "Client's modification date", name = "modificationDate", required = true)
    private LocalDateTime modificationDate;
}

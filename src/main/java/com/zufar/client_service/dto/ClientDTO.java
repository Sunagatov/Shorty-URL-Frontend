package com.zufar.client_service.dto;

import io.swagger.annotations.ApiModelProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientDTO {

    @ApiModelProperty(notes = "client's id", name="id")
    private Long id;

    @ApiModelProperty(notes = "client's short name", name="shortName", required=true)
    @NotEmpty(message = "please provide a client's short name. It is empty")
    @NotNull(message = "please provide a client's short name")
    @Size(min = 5, max = 60, message = "a client's short name length should be from 5 to 60")
    private String shortName;

    @ApiModelProperty(notes = "client's full name", name="fullName", required=true)
    @NotEmpty(message = "please provide a client's full name. It is empty")
    @NotNull(message = "please provide a client's full name")
    @Size(min = 5, max = 255, message = "a client's short name length should be from 5 to 255")
    private String fullName;

    @ApiModelProperty(notes = "client's type id", name="clientTypeId", required=true)
    @NotNull(message = "please provide a client's type id")
    private Long clientTypeId;

    @ApiModelProperty(notes = "client's inn", name="inn", required=true)
    @NotEmpty(message = "please provide a client's inn. It is empty")
    @NotNull(message = "please provide a client's inn")
    @Size(min = 5, max = 12, message = "a client's short name length should be from 5 to 12")
    private String inn;

    @ApiModelProperty(notes = "client's okpo", name="okpo")
    @Size(min = 5, max = 10, message = "a client's short name length should be from 5 to 10")
    private String okpo;

    @ApiModelProperty(notes = "order's ids of a client", name="orderIds")
    private Set<Order> orderIds;

    @ApiModelProperty(notes = "client's creation date", name="creationDate", required=true)
    private LocalDateTime creationDate;

    @ApiModelProperty(notes = "client's modification date", name="modificationDate", required=true)
    private LocalDateTime modificationDate;
}

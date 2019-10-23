package com.zufar.client_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientDTO {
    
    private Long id;
    private String shortName;
    private String fullName;
    private Long clientTypeId;
    private String inn;
    private String okpo;
    private Set<Order> orderIds;
    private LocalDateTime creationDate;
    private LocalDateTime modificationDate;
}

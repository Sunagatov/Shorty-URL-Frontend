package com.zufar.client_service_impl.converter;

import com.zufar.client_service_impl.entity.ClientType;
import com.zufar.order_management_system_common.dto.ClientTypeDTO;

import java.util.Objects;

public class ClientTypeConverter {

    public static ClientTypeDTO convertToClientTypeDTO(ClientType clientType) {
        Objects.requireNonNull(clientType, "There is no client to convert.");
        return new ClientTypeDTO(
                clientType.getId(),
                clientType.getShortName(),
                clientType.getFullName(),
                clientType.getTypeCode()
        );
    }

    public static ClientType convertToClientType(ClientTypeDTO clientTypeDTO) {
        Objects.requireNonNull(clientTypeDTO, "There is no client to convert.");
        return new ClientType(
                clientTypeDTO.getId(),
                clientTypeDTO.getShortName(),
                clientTypeDTO.getFullName(),
                clientTypeDTO.getTypeCode()
        );
    }
}

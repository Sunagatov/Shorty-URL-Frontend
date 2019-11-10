package com.zufar.client_service_impl.converter;

import com.zufar.client_service_impl.entity.Client;
import com.zufar.client_service_impl.entity.ClientType;
import com.zufar.order_management_system_common.dto.ClientDTO;
import com.zufar.order_management_system_common.dto.ClientTypeDTO;
import com.zufar.order_management_system_common.dto.OrderDTO;

import java.util.List;

public class ClientConverter {

    public static ClientDTO convertToClientDTO(Client client, ClientTypeDTO clientType, List<OrderDTO> orders) {
        return new ClientDTO(
                client.getId(),
                client.getShortName(),
                client.getFullName(),
                clientType.getId(),
                clientType,
                client.getInn(),
                client.getOkpo(),
                orders,
                client.getCreationDate(),
                client.getModificationDate());
    }

    public static Client convertToClient(ClientDTO client, ClientType clientType) {
        return new Client(
                client.getId(),
                client.getShortName(),
                client.getFullName(),
                clientType,
                client.getInn(),
                client.getOkpo(),
                client.getCreationDate(),
                client.getModificationDate());
    }
}

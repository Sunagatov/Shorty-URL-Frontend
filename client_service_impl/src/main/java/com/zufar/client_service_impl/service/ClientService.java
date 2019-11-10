package com.zufar.client_service_impl.service;

import com.zufar.client_service_impl.entity.Client;
import com.zufar.order_management_system_common.dto.ClientDTO;
import com.zufar.order_management_system_common.dto.ClientTypeDTO;
import com.zufar.order_management_system_common.dto.OrderDTO;
import com.zufar.order_management_system_common.exception.InternalServerException;
import com.zufar.order_service_api.client.OrderClientService;
import com.zufar.client_service_impl.repository.ClientRepository;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


@Service
public class ClientService {

    private static final Logger LOGGER = LogManager.getLogger(ClientService.class);

    private OrderClientService orderService;
    private ClientRepository clientRepository;
    private ClientTypeService clientTypeService;

    @Autowired
    public ClientService(ClientRepository clientRepository,
                         ClientTypeService clientTypeService,
                         OrderClientService orderService
    ) {
        this.orderService = orderService;
        this.clientRepository = clientRepository;
        this.clientTypeService = clientTypeService;
    }

    public List<ClientDTO> getAll() {
        LOGGER.info("Get all clients.");
        return StreamSupport.stream(clientRepository.findAll().spliterator(), false)
                .map(this::convertToClientDTO)
                .collect(Collectors.toList());
    }

    public ClientDTO getById(Long id) {
        LOGGER.info(String.format("Get client with id=[%d]", id));
        return clientRepository.findById(id).map(this::convertToClientDTO).orElse(null);
    }

    public ClientDTO save(ClientDTO client) {
        Client clientEntity = convertToClient(client, false);
        clientEntity = this.clientRepository.save(clientEntity);
        LOGGER.info(String.format("Client=[%s] was saved in a database successfully.", client));
        return convertToClientDTO(clientEntity);
    }

    public ClientDTO update(ClientDTO client) {
        Client clientEntity = convertToClient(client, true);
        clientEntity = this.clientRepository.save(clientEntity);
        LOGGER.info(String.format("Client=[%s] was updated in a database successfully.", client));
        return convertToClientDTO(clientEntity);
    }

    @Transactional
    public void deleteById(Long id) {
        this.clientRepository.deleteById(id);
        LOGGER.info(String.format("Client with id=[%d] was deleted successfully.", id));
        this.orderService.deleteAllByClientId(id);
        LOGGER.info(String.format("All orders of client with id=[%d] was deleted successfully.", id));
    }

    private ClientDTO convertToClientDTO(Client client) {
        Objects.requireNonNull(client, "There is no a client to convert.");
        Long clientId = client.getId();
        List<OrderDTO> orders = new ArrayList<>();
        if (clientId != null) {
            orders = this.getOrders(clientId);
        }
        ClientTypeDTO clientTypeDTO = ClientTypeService.convertToClientTypeDTO(client.getClientType());
        ClientDTO result = new ClientDTO(
                clientId,
                client.getShortName(),
                client.getFullName(),
                clientTypeDTO.getId(),
                clientTypeDTO,
                client.getInn(),
                client.getOkpo(),
                orders,
                client.getCreationDate(),
                client.getModificationDate());
        LOGGER.info(String.format("A client entity - [%s] was converted to the client - [%s] successfully.", client, result));
        return result;
    }

    public Boolean isClientExists(Long clientId) {
        return this.clientRepository.existsById(clientId);
    }

    private List<OrderDTO> getOrders(Long clientId) {
        LOGGER.info(String.format("Get all orders of client with id=[%d] from the order service.", clientId));
        List<OrderDTO> orders;
        try {
            orders = orderService.getAllByClientIds(clientId).getBody();
        } catch (Exception exception) {
            String errorMessage = String.format("It is impossible to get orders of the client with id=[%d]. There are some problems with order service.", clientId);
            LOGGER.error(errorMessage, exception);
            throw new InternalServerException(errorMessage, exception);
        }
        return orders;
    }

    private Client convertToClient(ClientDTO clientInput, boolean isUpdateMode) {
        Objects.requireNonNull(clientInput, "There is no clientInput to convert.");
        LocalDateTime creationDate;
        LocalDateTime currentDate = LocalDateTime.now();
        if (isUpdateMode) {
            ClientDTO client = this.getById(clientInput.getId());
            creationDate = client.getCreationDate();
        } else {
            creationDate = currentDate;
        }
        ClientTypeDTO clientType = this.clientTypeService.getById(clientInput.getClientTypeId());
        Client result = new Client(
                clientInput.getId(),
                clientInput.getShortName(),
                clientInput.getFullName(),
                ClientTypeService.convertToClientType(clientType),
                clientInput.getInn(),
                clientInput.getOkpo(),
                creationDate,
                currentDate);
        LOGGER.info(String.format("A clientInput dto - [%s] was converted to the clientInput entity - [%s] successfully.", clientInput, result));
        return result;
    }
}

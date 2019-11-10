package com.zufar.client_service_impl.service;

import com.zufar.client_service_impl.converter.ClientConverter;
import com.zufar.client_service_impl.converter.ClientTypeConverter;
import com.zufar.client_service_impl.entity.Client;
import com.zufar.client_service_impl.entity.ClientType;
import com.zufar.order_management_system_common.dto.ClientDTO;
import com.zufar.order_management_system_common.dto.ClientTypeDTO;
import com.zufar.order_management_system_common.dto.OrderDTO;
import com.zufar.order_management_system_common.exception.ClientNotFoundException;
import com.zufar.order_management_system_common.exception.InternalServerException;
import com.zufar.client_service_impl.repository.ClientRepository;

import com.zufar.order_service_api.client.OrderFeignService;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


@Service
public class ClientService {

    private static final Logger LOGGER = LogManager.getLogger(ClientService.class);

    private OrderFeignService orderService;
    private ClientRepository clientRepository;
    private ClientTypeService clientTypeService;

    @Autowired
    public ClientService(ClientRepository clientRepository,
                         ClientTypeService clientTypeService,
                         OrderFeignService orderService
    ) {
        this.orderService = orderService;
        this.clientRepository = clientRepository;
        this.clientTypeService = clientTypeService;
    }

    public List<ClientDTO> getAll() {
        LOGGER.info("Getting all clients.");
        Iterable<Client> clients = clientRepository.findAll();
        LOGGER.info("Getting all client orders.");
        Map<Long, List<OrderDTO>> ordersByClientId = this.getOrders(StreamSupport.stream(clients.spliterator(), false)
                .map(Client::getId)
                .toArray(Long[]::new))
                .stream()
                .collect(Collectors.groupingBy(OrderDTO::getClientId));
        LOGGER.info("Getting all client types.");
        List<ClientTypeDTO> clientTypes = clientTypeService.getAll();
        return StreamSupport.stream(clients.spliterator(), false)
                .map(client -> {
                    ClientTypeDTO clientType = clientTypes.stream()
                            .filter(currentClientType -> currentClientType.getId().equals(client.getClientType().getId()))
                            .findFirst()
                            .orElse(null);
                    List<OrderDTO> currentClientOrders = ordersByClientId.get(client.getId());
                    return ClientConverter.convertToClientDTO(client, clientType, currentClientOrders);
                })
                .collect(Collectors.toList());
    }

    public ClientDTO getById(Long id) {
        LOGGER.info(String.format("Get client with id=[%d]", id));
        return clientRepository.findById(id).map(this::convertToClientDTO).orElse(null);
    }

    public ClientDTO save(ClientDTO client) {
        LocalDateTime currentDate = LocalDateTime.now();
        client.setCreationDate(currentDate);
        client.setModificationDate(currentDate);
        Client clientEntity = convertToClient(client);
        clientEntity = this.clientRepository.save(clientEntity);
        LOGGER.info(String.format("Client=[%s] was saved in a database successfully.", client));
        return convertToClientDTO(clientEntity);
    }

    public ClientDTO update(ClientDTO client) {
        Long clientId = client.getId();
        Client oldClient = this.clientRepository.findById(clientId).orElse(null);
        if (oldClient == null) {
            String fullErrorMessage = String.format("It is impossible to updated client=[%s]. Client with id=[%d] was not found.", client, clientId);
            LOGGER.error(fullErrorMessage);
            throw new ClientNotFoundException(fullErrorMessage);
        }
        client.setCreationDate(oldClient.getCreationDate());
        client.setModificationDate(LocalDateTime.now());

        Client clientEntity = convertToClient(client);
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
        ClientTypeDTO clientTypeDTO = ClientTypeConverter.convertToClientTypeDTO(client.getClientType());
        ClientDTO result = ClientConverter.convertToClientDTO(client, clientTypeDTO, orders);
        LOGGER.info(String.format("A client entity - [%s] was converted to the client - [%s] successfully.", client, result));
        return result;
    }

    public Boolean isExists(Long clientId) {
        return this.clientRepository.existsById(clientId);
    }

    private List<OrderDTO> getOrders(Long... clientIds) {
        LOGGER.info("Get all orders of client with id=[%d] from the order service.");
        List<OrderDTO> orders;
        try {
            orders = orderService.getAllByClientIds(clientIds).getBody();
        } catch (Exception exception) {
            String errorMessage = "It is impossible to get client orders. There are some problems with order service.";
            LOGGER.error(errorMessage, exception);
            throw new InternalServerException(errorMessage, exception);
        }
        return orders;
    }

    private Client convertToClient(ClientDTO clientDTO) {
        Objects.requireNonNull(clientDTO, "There is no clientDTO to convert.");
        ClientType clientType = ClientTypeConverter.convertToClientType(this.clientTypeService.getById(clientDTO.getClientTypeId()));
        Client result = ClientConverter.convertToClient(clientDTO, clientType);
        LOGGER.info(String.format("A clientDTO dto - [%s] was converted to the client entity - [%s] successfully.", clientDTO, result));
        return result;
    }
}

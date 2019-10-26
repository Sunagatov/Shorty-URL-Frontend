package com.zufar.service;

import com.zufar.dto.ClientDTO;
import com.zufar.dto.ClientTypeDTO;
import com.zufar.dto.OrderDTO;
import com.zufar.dto.ClientInputDTO;
import com.zufar.entity.Client;
import com.zufar.repository.ClientRepository;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


@Service
public class ClientService {

    private static final Logger LOGGER = LogManager.getLogger(ClientService.class);

    private OrderService orderService;
    private ClientRepository clientRepository;
    private ClientTypeService clientTypeService;

    @Autowired
    public ClientService(ClientRepository clientRepository,
                         ClientTypeService clientTypeService,
                         OrderService orderService) {
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

    public ClientDTO save(ClientInputDTO client) {
        Client clientEntity = convertToClient(client);
        clientEntity = this.clientRepository.save(clientEntity);
        LOGGER.info(String.format("Client=[%s] was saved in a database successfully.", client));
        return convertToClientDTO(clientEntity);
    }

    public ClientDTO update(ClientInputDTO client) {
        Client clientEntity = convertToClient(client);
        clientEntity = this.clientRepository.save(clientEntity);
        LOGGER.info(String.format("Client=[%s] was updated in a database successfully.", client));
        return convertToClientDTO(clientEntity);
    }

    @Transactional
    public void deleteById(Long id) {
        this.clientRepository.deleteById(id);
        LOGGER.info(String.format("Client with id=[%d] was deleted successfully.", id));
        this.orderService.deleteOrders(id);
        LOGGER.info(String.format("All orders of client with id=[%d] was deleted successfully.", id));
    }

    private ClientDTO convertToClientDTO(Client client) {
        Objects.requireNonNull(client, "There is no a client to convert.");
        List<OrderDTO> orders = this.getOrders(client.getOrders());
        ClientDTO result = new ClientDTO(
                client.getId(),
                client.getShortName(),
                client.getFullName(),
                ClientTypeService.convertToClientTypeDTO(client.getClientType()),
                client.getInn(),
                client.getOkpo(),
                orders,
                client.getCreationDate(),
                client.getModificationDate());
        LOGGER.info(String.format("A client entity - [%s] was converted to the client - [%s] successfully.", client, result));
        return result;
    }

    private List<OrderDTO> getOrders(List<Long> orderIds) {
        LOGGER.info(String.format("Get all orders with ids=[%s] from the order service.", orderIds));
        return orderService.getOrdersByIds(orderIds).getBody();
    }

    private Client convertToClient(ClientInputDTO client) {
        Objects.requireNonNull(client, "There is no client to convert.");
        ClientTypeDTO clientType = this.clientTypeService.getById(client.getClientTypeId());
        Client result = new Client(
                client.getId(),
                client.getShortName(),
                client.getFullName(),
                ClientTypeService.convertToClientType(clientType),
                client.getInn(),
                client.getOkpo(),
                client.getOrderIds(),
                client.getCreationDate(),
                client.getModificationDate());
        LOGGER.info(String.format("A client dto - [%s] was converted to the client entity - [%s] successfully.", client, result));
        return result;
    }
}

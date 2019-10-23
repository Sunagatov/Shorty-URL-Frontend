package com.zufar.client_service.service;


import com.zufar.client_service.dto.ClientDTO;
import com.zufar.client_service.dto.Order;
import com.zufar.client_service.entity.Client;
import com.zufar.client_service.entity.ClientType;
import com.zufar.client_service.exception.ClientNotFoundException;
import com.zufar.client_service.exception.ClientTypeNotFoundException;
import com.zufar.client_service.exception.OrderNotFoundException;
import com.zufar.client_service.repository.ClientRepository;

import com.zufar.client_service.repository.ClientTypeRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.ArrayList;
import java.util.Set;
import java.util.HashSet;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional
public class ClientService {

    private static final Logger LOGGER = LogManager.getLogger(ClientService.class);

    private final ClientRepository clientRepository;
    private final ClientTypeRepository clientTypeRepository;
    private final OrderService orderService;

    @Autowired
    public ClientService(ClientRepository clientRepository,
                         ClientTypeRepository clientTypeRepository,
                         OrderService orderService) {
        this.clientRepository = clientRepository;
        this.clientTypeRepository = clientTypeRepository;
        this.orderService = orderService;
    }

    public Collection<ClientDTO> getAll() {
        final String mainErrorMessage = "It is impossible to get all clients.";
        final Iterable<Client> clients;
        try {
            clients = clientRepository.findAll();
        } catch (Exception exception) {
            final String databaseErrorMessage = mainErrorMessage + " There are some problems with a database.";
            LOGGER.error(databaseErrorMessage, exception);
            throw new ClientNotFoundException(databaseErrorMessage, exception);
        }
        Collection<ClientDTO> result = new ArrayList<>();
        for (Client currentClient : clients) {
            final Set<Order> orders;
            try {
                final Set<Long> orderIds = currentClient.getOrders();
                orders = new HashSet<>(orderService.getOrders(orderIds));
            } catch (Exception exception) {
                final String databaseErrorMessage = mainErrorMessage +
                        String.format(" There are some problems with a order service. It is impossible to load orders for client with %s", currentClient);
                LOGGER.error(databaseErrorMessage, exception);
                throw new OrderNotFoundException(databaseErrorMessage, exception);
            }
            ClientDTO client = convertToClientDTO(currentClient, orders);
            result.add(client);
        }
        return result;
    }

    public ClientDTO getById(Long id) {
        final String mainErrorMessage = String.format("It is impossible to get client with id = [%d].", id);
        final Client client;
        try {
            client = clientRepository.findById(id).orElse(null);
            if (client == null) {
                return null;
            }
        } catch (Exception exception) {
            final String databaseErrorMessage = mainErrorMessage + " There are some problems with a database.";
            LOGGER.error(databaseErrorMessage, exception);
            throw new ClientNotFoundException(databaseErrorMessage, exception);
        }
        final Set<Long> orderIds = client.getOrders();
        if (orderIds == null) {
            return convertToClientDTO(client, null);
        }
        final Set<Order> orders;
        try {
            orders = new HashSet<>(orderService.getOrders());
        } catch (Exception exception) {
            final String databaseErrorMessage = mainErrorMessage +
                    String.format(" There are some problems with a order service. It is impossible to load orders for client with %s", client);
            LOGGER.error(databaseErrorMessage, exception);
            throw new OrderNotFoundException(databaseErrorMessage, exception);
        }
        return convertToClientDTO(client, orders);
    }

    public Client save(ClientDTO client) {
        final String mainErrorMessage = String.format("It is impossible to save a client [%s].", client);
        final ClientType clientType;
        final Long clientTypeId = client.getClientTypeId();
        try {
            clientType = this.clientTypeRepository.findById(clientTypeId).orElse(null);
            if (clientType == null) {
                final String databaseErrorMessage = mainErrorMessage +
                        String.format(" The client's type with id=[%d] is absent.", clientTypeId);
                LOGGER.error(databaseErrorMessage);
                throw new ClientTypeNotFoundException(databaseErrorMessage);
            }
        } catch (Exception exception) {
            final String databaseErrorMessage = mainErrorMessage +
                    String.format(" There are some problems with database. A client's type with id=[%d] is not loaded.", clientTypeId);
            LOGGER.error(databaseErrorMessage, exception);
            throw new ClientTypeNotFoundException(databaseErrorMessage, exception);
        }
        final Client clientEntity = convertToClient(client, clientType);
        return this.clientRepository.save(clientEntity);
    }

    public Client update(ClientDTO client) {
        this.isExists(client.getId());
        return this.save(client);
    }

    public void deleteById(Long id) {
        final Client client = this.clientRepository.findById(id).orElse(null);
        if (client == null) {
            final String errorMessage = String.format("The client with id=[%d] not found.", id);
            LOGGER.error(errorMessage);
            throw new ClientNotFoundException(errorMessage);
        }
        try {
            this.clientRepository.deleteById(id);
        } catch (Exception exception) {
            final String databaseErrorMessage = String.format("It is impossible to delete client with id=[%b]. There are some problems with a database.", id);
            LOGGER.error(databaseErrorMessage, exception);
            throw new ClientNotFoundException(databaseErrorMessage, exception);
        }
        final Set<Long> orderIds = client.getOrders();
        this.orderService.deleteOrders(orderIds);
    }

    private void isExists(Long id) {
        if (!this.clientRepository.existsById(id)) {
            final String errorMessage = "The client with id = " + id + " not found.";
            ClientNotFoundException clientNotFoundException = new ClientNotFoundException(errorMessage);
            LOGGER.error(errorMessage, clientNotFoundException);
            throw clientNotFoundException;
        }
    }

    private ClientDTO convertToClientDTO(Client client, Set<Order> orders) {
        Objects.requireNonNull(client, "There is no a client to convert.");
        return new ClientDTO(
                client.getId(),
                client.getShortName(),
                client.getFullName(),
                client.getClientType().getId(),
                client.getInn(),
                client.getOkpo(),
                orders,
                client.getCreationDate(),
                client.getModificationDate()
        );
    }

    private Client convertToClient(ClientDTO client, ClientType clientType) {
        Objects.requireNonNull(client, "There is no client to convert.");
        final Set<Long> orderIds;
        if (client.getOrderIds() == null) {
            orderIds = null;
        } else {
            orderIds = client.getOrderIds()
                    .stream()
                    .map(Order::getId)
                    .collect(Collectors.toSet());
        }
        return new Client(
                client.getId(),
                client.getShortName(),
                client.getFullName(),
                clientType,
                client.getInn(),
                client.getOkpo(),
                orderIds,
                client.getCreationDate(),
                client.getModificationDate()
        );
    }
}

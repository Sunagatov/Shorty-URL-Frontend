package com.zufar.service;


import com.zufar.dto.ClientDTO;
import com.zufar.dto.Order;
import com.zufar.entity.Client;
import com.zufar.entity.ClientType;
import com.zufar.exception.ClientNotFoundException;
import com.zufar.exception.ClientTypeNotFoundException;
import com.zufar.exception.OrderNotFoundException;
import com.zufar.repository.ClientRepository;

import com.zufar.repository.ClientTypeRepository;
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
        final Iterable<Client> clientEntities;
        try {
            clientEntities = clientRepository.findAll();
        } catch (Exception exception) {
            final String databaseErrorMessage = mainErrorMessage + " There are some problems with a database.";
            LOGGER.error(databaseErrorMessage, exception);
            throw new ClientNotFoundException(databaseErrorMessage, exception);
        }
        Collection<ClientDTO> clients = new ArrayList<>();
        for (Client currentClient : clientEntities) {
            final Set<Order> orders;
            try {
                final Set<Long> orderIds = currentClient.getOrders();
                if (orderIds == null || orderIds.isEmpty()) {
                    ClientDTO client = convertToClientDTO(currentClient, null);
                    clients.add(client);
                    continue;
                }
                orders = new HashSet<>(orderService.getOrders(currentClient.getId()));
            } catch (Exception exception) {
                final String databaseErrorMessage = mainErrorMessage +
                        String.format(" There are some problems with a order service. It is impossible to load orders for client with %s", currentClient);
                LOGGER.error(databaseErrorMessage, exception);
                throw new OrderNotFoundException(databaseErrorMessage, exception);
            }
            ClientDTO client = convertToClientDTO(currentClient, orders);
            clients.add(client);
        }
        return clients;
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
            orders = new HashSet<>(orderService.getOrders(client.getId()));
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
        this.orderService.deleteOrders(client.getId());
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

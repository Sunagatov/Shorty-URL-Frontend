package com.zufar.service;


import com.zufar.entity.ClientType;
import com.zufar.exception.ClientTypeNotFoundException;
import com.zufar.repository.ClientTypeRepository;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional
public class ClientTypeService {

    private static final Logger LOGGER = LogManager.getLogger(ClientTypeService.class);

    private final ClientTypeRepository clientTypeRepository;

    @Autowired
    public ClientTypeService(ClientTypeRepository clientTypeRepository) {
        this.clientTypeRepository = clientTypeRepository;
    }

    public List<ClientType> getAll() {
        List<ClientType> clientTypes;
        try {
            clientTypes = (List<ClientType>) this.clientTypeRepository.findAll();
            LOGGER.info("All clientTypes were loaded from a database.");
        } catch (Exception exception) {
            String databaseErrorMessage = "It is impossible to get all clientTypes. There are some problems with a database.";
            LOGGER.error(databaseErrorMessage, exception);
            throw exception;
        }
        return clientTypes;
    }

    public ClientType getById(Long id) {
        this.isExists(id);
        ClientType clientType;
        try {
            clientType = this.clientTypeRepository.findById(id).orElse(null);
            LOGGER.info(String.format("The clientType with id=[%d] were loaded from a database.", id));
        } catch (Exception exception) {
            String databaseErrorMessage = String.format("It is impossible to get the clientType with id = [%d]. There are some problems with a database.", id);
            LOGGER.error(databaseErrorMessage, exception);
            throw exception;
        }
        return clientType;
    }

    private void isExists(Long id) {
        if (!this.clientTypeRepository.existsById(id)) {
            String errorMessage = String.format("The category with id = [%d] not found.", id);
            LOGGER.error(errorMessage);
            throw new ClientTypeNotFoundException(errorMessage);
        }
    }
}

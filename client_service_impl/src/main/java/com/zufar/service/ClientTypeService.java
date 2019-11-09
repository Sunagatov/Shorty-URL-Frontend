package com.zufar.service;


import com.zufar.entity.ClientType;
import com.zufar.order_management_system_common.dto.ClientTypeDTO;
import com.zufar.order_management_system_common.exception.ClientTypeNotFoundException;
import com.zufar.order_management_system_common.exception.InternalServerException;
import com.zufar.repository.ClientTypeRepository;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;


@Service
@Transactional
public class ClientTypeService {

    private static final Logger LOGGER = LogManager.getLogger(ClientTypeService.class);

    private ClientTypeRepository clientTypeRepository;

    @Autowired
    public ClientTypeService(ClientTypeRepository clientTypeRepository) {
        this.clientTypeRepository = clientTypeRepository;
    }

    public List<ClientTypeDTO> getAll() {
        List<ClientType> clientTypes;
        try {
            clientTypes = (List<ClientType>) this.clientTypeRepository.findAll();
        } catch (Exception exception) {
            String errorMessage = "It is impossible to get all clientTypes. There are some problems with a database.";
            LOGGER.error(errorMessage, exception);
            throw new InternalServerException(errorMessage, exception);
        }
        LOGGER.info("All clientTypes were loaded from a database.");
        return clientTypes.
                stream()
                .map(ClientTypeService::convertToClientTypeDTO)
                .collect(Collectors.toList());
    }

    public ClientTypeDTO getById(Long id) {
        this.isExists(id);
        ClientType clientType;
        try {
            clientType = this.clientTypeRepository.findById(id).orElse(null);
            LOGGER.info(String.format("The clientType with id=[%d] were loaded from a database.", id));
        } catch (Exception exception) {
            String errorMessage = String.format("It is impossible to get the clientType with id = [%d]. There are some problems with a database.", id);
            LOGGER.error(errorMessage, exception);
            throw new InternalServerException(errorMessage, exception);
        }
        return convertToClientTypeDTO(clientType);
    }

    private void isExists(Long id) {
        if (!this.clientTypeRepository.existsById(id)) {
            String errorMessage = String.format("The category with id = [%d] not found.", id);
            LOGGER.error(errorMessage);
            throw new ClientTypeNotFoundException(errorMessage);
        }
    }

    public static ClientTypeDTO convertToClientTypeDTO(ClientType clientType) {
        Objects.requireNonNull(clientType, "There is no client to convert.");
        ClientTypeDTO clientTypeDTO = new ClientTypeDTO(
                clientType.getId(),
                clientType.getShortName(),
                clientType.getFullName(),
                clientType.getTypeCode()
        );
        LOGGER.info(String.format("A ClientType - [%s] was converted to the ClientTypeDTO successfully.", clientTypeDTO));
        return clientTypeDTO;
    }

    public static ClientType convertToClientType(ClientTypeDTO clientTypeDTO) {
        Objects.requireNonNull(clientTypeDTO, "There is no client to convert.");
        ClientType clientType = new ClientType(
                clientTypeDTO.getId(),
                clientTypeDTO.getShortName(),
                clientTypeDTO.getFullName(),
                clientTypeDTO.getTypeCode()
        );
        LOGGER.info(String.format("A ClientType - [%s] was converted to the ClientTypeDTO successfully.", clientType));
        return clientType;
    }
}

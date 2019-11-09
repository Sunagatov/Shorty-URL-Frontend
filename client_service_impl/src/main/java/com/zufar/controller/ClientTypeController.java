package com.zufar.controller;

import com.zufar.client_service_api.endpoint.ClientTypeServiceEndpoint;
import com.zufar.entity.ClientType;
import com.zufar.order_management_system_common.dto.ClientTypeDTO;
import com.zufar.service.ClientTypeService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "Client type api")
@Validated
@RestController
@RequestMapping(value = "client-types")
public class ClientTypeController implements ClientTypeServiceEndpoint<ClientTypeDTO, Long> {

    private ClientTypeService clientTypeService;

    @Autowired
    public ClientTypeController(ClientTypeService clientTypeService) {
        this.clientTypeService = clientTypeService;
    }

    @ApiOperation(value = "View a client type list.", response = ClientType.class, responseContainer = "List")
    @GetMapping
    public @ResponseBody ResponseEntity<List<ClientTypeDTO>> getAll() {
        return new ResponseEntity<>(this.clientTypeService.getAll(), HttpStatus.OK);
    }


    @ApiOperation(value = "View the client type with given id.", response = ClientType.class)
    @GetMapping(value = "/{id}")
    public @ResponseBody ResponseEntity<ClientTypeDTO> getById(@ApiParam(value = "An id which is used to retrieve an client type.", required = true) @PathVariable Long id) {
        return new ResponseEntity<>(this.clientTypeService.getById(id), HttpStatus.OK);
    }
}

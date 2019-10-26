package com.zufar.controller;

import com.zufar.dto.ClientTypeDTO;
import com.zufar.entity.ClientType;
import com.zufar.service.ClientTypeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "Client type api",
        consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE)
@Validated
@RestController
@RequestMapping(value = "client-types", produces = {MediaType.APPLICATION_JSON_VALUE}, consumes = {MediaType.APPLICATION_JSON_VALUE})
public class ClientTypeController {

    private ClientTypeService clientTypeService;

    @Autowired
    public ClientTypeController(ClientTypeService clientTypeService) {
        this.clientTypeService = clientTypeService;
    }

    @ApiOperation(value = "View a client type list.", response = ClientType.class, responseContainer = "List")
    @GetMapping
    public @ResponseBody ResponseEntity<List<ClientTypeDTO>> getClientTypes() {
        return new ResponseEntity<>(this.clientTypeService.getAll(), HttpStatus.OK);
    }


    @ApiOperation(value = "View the client type with given id.", response = ClientType.class)
    @GetMapping(value = "/{id}")
    public @ResponseBody ResponseEntity<ClientTypeDTO> getClientType(@ApiParam(value = "An id which is used to retrieve an client type.", required = true) @PathVariable Long id) {
        return new ResponseEntity<>(this.clientTypeService.getById(id), HttpStatus.OK);
    }
}

package com.zufar.controller;

import com.zufar.dto.ClientResponseDTO;
import com.zufar.dto.ClientInputDTO;
import com.zufar.service.ClientService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiOperation;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Api(value = "Client api",
        consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE)
@Validated
@RestController
@RequestMapping(value = "clients", produces = {MediaType.APPLICATION_JSON_VALUE}, consumes = {MediaType.APPLICATION_JSON_VALUE})
public class ClientController {

    private ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @ApiOperation(value = "View the client list.", response = ClientResponseDTO.class, responseContainer = "List")
    @GetMapping
    public @ResponseBody ResponseEntity<List<ClientResponseDTO>> getClients() {
        return new ResponseEntity<>(this.clientService.getAll(), HttpStatus.OK);
    }

    @ApiOperation(value = "View the client with given client id.", response = ClientResponseDTO.class)
    @GetMapping(value = "/{id}")
    public @ResponseBody ResponseEntity<ClientResponseDTO> getClient(@ApiParam(value = "A client id which is used to retrieve a client.", required = true) @PathVariable Long id) {
        return new ResponseEntity<>(this.clientService.getById(id), HttpStatus.OK);
    }

    @ApiOperation(value = "Delete the client with given client id.", response = ResponseEntity.class)
    @DeleteMapping(value = "/{id}")
    public @ResponseBody ResponseEntity deleteClient(@ApiParam(value = "A client id which is used to delete a client.", required = true) @PathVariable Long id) {
        this.clientService.deleteById(id);
        return ResponseEntity.ok(String.format("The client with id=[%d] was deleted", id));
    }

    @ApiOperation(value = "Save a new client.", response = ResponseEntity.class)
    @PostMapping
    public @ResponseBody ResponseEntity saveClient(@ApiParam(value = "An client object which which will be saved.", required = true) @Valid @RequestBody ClientInputDTO client) {
        ClientResponseDTO result = this.clientService.save(client);
        return ResponseEntity.ok(String.format("The client [%s] was saved.", result));
    }
    @ApiOperation(value = "Update an existed client.", response = ResponseEntity.class)
    @PutMapping
    public @ResponseBody ResponseEntity updateClient(@ApiParam(value = "An client object which will be used to update an existed client.", required = true) @Valid @RequestBody ClientInputDTO client) {
        ClientResponseDTO result = this.clientService.update(client);
        return ResponseEntity.ok(String.format("The client [%s] was updated.", result));
    }

    @ApiOperation(value = "Check if is client exists.", response = ResponseEntity.class)
    @PostMapping("client")
    public @ResponseBody ResponseEntity<Boolean> isClientExists(@ApiParam(value = "An client id which will be used to check is client exists.", required = true) @NotNull @RequestBody Long clientId) {
        return new ResponseEntity<>(this.clientService.isClientExists(clientId), HttpStatus.OK);

    }
}

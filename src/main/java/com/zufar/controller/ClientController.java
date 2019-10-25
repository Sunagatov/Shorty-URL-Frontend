package com.zufar.controller;

import com.zufar.dto.ClientDTO;
import com.zufar.entity.Client;
import com.zufar.entity.ClientType;
import com.zufar.repository.ClientTypeRepository;

import com.zufar.service.ClientService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

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

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.Collection;

@Api(value = "clients")
@RestController
@Validated
@RequestMapping(value = "clients", produces = {MediaType.APPLICATION_JSON_VALUE})
public class ClientController {

    private final ClientService clientService;
    private final ClientTypeRepository clientTypeRepository;

    @Autowired
    public ClientController(ClientService clientService,
                            ClientTypeRepository clientTypeRepository) {
        this.clientService = clientService;
        this.clientTypeRepository = clientTypeRepository;
    }

    @GetMapping
    @ApiOperation(value = "View the list of clients", response = Collection.class)
    public @ResponseBody Collection<ClientDTO> getClients() {
        return this.clientService.getAll();
    }

    @GetMapping(value = "/{id}")
    @ApiOperation(value = "View the client with the id", response = ClientDTO.class)
    public @ResponseBody ClientDTO getClient(@Valid @NotNull @ApiParam(value = "A client id which is used to retrieve a client", required = true)@PathVariable Long id) {
        return this.clientService.getById(id);
    }

    @DeleteMapping(value = "/{id}")
    @ApiOperation(value = "Delete the client with an id", response = ResponseEntity.class)
    public @ResponseBody ResponseEntity deleteClient(@Valid @NotNull @ApiParam(value = "A client id which is used to delete a client", required = true) @PathVariable Long id) {
        this.clientService.deleteById(id);
        return ResponseEntity.ok(String.format("The client with id=[%d] was deleted", id));
    }

    @PostMapping
    @ApiOperation(value = "Save a new client", response = ResponseEntity.class)
    public @ResponseBody ResponseEntity saveClient(@Valid @NotNull @ApiParam(value = "An client object which which will be saved", required = true) @RequestBody ClientDTO client) {
        final Client clientEntity = this.clientService.save(client);
        return ResponseEntity.ok(String.format("The client [%s] was saved", clientEntity));
    }

    @PutMapping
    @ApiOperation(value = "Update an existed client", response = ResponseEntity.class)
    public @ResponseBody ResponseEntity updateClient(@Valid @NotNull @ApiParam(value = "An client object which which will be used to update an existed client", required = true) @RequestBody ClientDTO client) {
        final Client  clientEntity= this.clientService.update(client);
        return ResponseEntity.ok(String.format("The client [%s] was updated", clientEntity));
    }

    @GetMapping(value = "/types")
    @ApiOperation(value = "View the list of client's type", response = Iterable.class)
    public @ResponseBody Iterable<ClientType> getClientTypes() {
        return this.clientTypeRepository.findAll();
    }
}

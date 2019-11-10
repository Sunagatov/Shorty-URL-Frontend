package com.zufar.client_service_impl.controller;

import com.zufar.client_service_api.endpoint.ClientServiceEndpoint;
import com.zufar.order_management_system_common.dto.ClientDTO;
import com.zufar.order_management_system_common.dto.OperationResult;
import com.zufar.client_service_impl.service.ClientService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiOperation;

import org.springframework.http.HttpStatus;
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

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Api(value = "Client api")
@Validated
@RestController
@RequestMapping(value = "clients")
public class ClientController implements ClientServiceEndpoint<ClientDTO, Long> {

    private ClientService clientService;
    private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy hh:mm:ss");

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @ApiOperation(value = "View the client list.", response = ClientDTO.class, responseContainer = "List")
    @GetMapping
    @Override
    public @ResponseBody ResponseEntity<List<ClientDTO>> getAll() {
        return new ResponseEntity<>(this.clientService.getAll(), HttpStatus.OK);
    }

    @ApiOperation(value = "View the client with given client id.", response = ClientDTO.class)
    @GetMapping(value = "/{id}")
    @Override
    public @ResponseBody ResponseEntity<ClientDTO> getById(@ApiParam(value = "A client id which is used to retrieve a client.", required = true) @PathVariable Long id) {
        return new ResponseEntity<>(this.clientService.getById(id), HttpStatus.OK);
    }

    @ApiOperation(value = "Delete the client with given client id.", response = ResponseEntity.class)
    @DeleteMapping(value = "/{id}")
    @Override
    public @ResponseBody ResponseEntity deleteById(@ApiParam(value = "A client id which is used to delete a client.", required = true) @PathVariable Long id) {
        this.clientService.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(OperationResult.builder()
                        .timestamp(LocalDateTime.now().format(formatter))
                        .message(String.format("The client with given id=[%d] was deleted.", id))
                        .status(HttpStatus.OK.toString())
                        .build());
    }

    @ApiOperation(value = "Save a new client.", response = ResponseEntity.class)
    @PostMapping
    @Override
    public @ResponseBody ResponseEntity save(@ApiParam(value = "An client object which which will be saved.", required = true) @NotNull  @Valid @RequestBody ClientDTO client) {
        ClientDTO savedClient = this.clientService.save(client);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(OperationResult.builder()
                        .timestamp(LocalDateTime.now().format(formatter))
                        .message((String.format("The client [%s] was saved.", savedClient)))
                        .status(HttpStatus.CREATED.toString())
                        .build());
    }

    @ApiOperation(value = "Update an existed client.", response = ResponseEntity.class)
    @PutMapping
    @Override
    public @ResponseBody ResponseEntity update(@ApiParam(value = "An client object which will be used to update an existed client.", required = true) @NotNull @Valid @RequestBody ClientDTO client) {
        ClientDTO updatedClient = this.clientService.update(client);
        return ResponseEntity.status(HttpStatus.OK)
                .body(OperationResult.builder()
                        .timestamp(LocalDateTime.now().format(formatter))
                        .message((String.format("The client [%s] was updated.", updatedClient)))
                        .status(HttpStatus.OK.toString())
                        .build());
    }

    @ApiOperation(value = "Check if is client exists.", response = ResponseEntity.class)
    @PostMapping("client")
    @Override
    public @ResponseBody ResponseEntity<Boolean> isExists(@ApiParam(value = "An client id which will be used to check is client exists.", required = true) @NotNull @RequestBody Long clientId) {
        return new ResponseEntity<>(this.clientService.isExists(clientId), HttpStatus.OK);
    }
}

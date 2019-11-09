package com.zufar.client_service_api.endpoint;

import com.zufar.order_management_system_common.dto.ClientDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

@RequestMapping("/default")
public interface ClientServiceEndpoint<E extends ClientDTO, T extends Number> {

    /**
     * Returns all clients.
     *
     * @return all clients.
     */
    List<E> getAll();

    /**
     * Returns the client with given id.
     *
     * @param id must not be {@literal null}.
     * @return the client with the given id.
     */
    ResponseEntity<E> getById(T id);

    /**
     * Deletes the client with the given id.
     *
     * @param id must not be {@literal null}.
     * @return the operation info.
     */
    ResponseEntity deleteById(T id);

    /**
     * Saves the given client.
     *
     * @param client must not be {@literal null}.
     * @return the operation info.
     */
    ResponseEntity save(@NotNull @Valid E client);

    /**
     * Updates the given client.
     *
     * @param client must not be {@literal null}.
     * @return the operation info.
     */
    ResponseEntity update(@NotNull @Valid E client);

    /**
     * Returns whether an client with the given id exists.
     *
     * @param clientId must not be {@literal null}.
     * @return {@literal true} if an entity with the given id exists, {@literal false} otherwise.
     */
    ResponseEntity<Boolean> isClientExists(@NotNull T clientId);
}

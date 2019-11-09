package com.zufar.client_service_api.endpoint;

import com.zufar.order_management_system_common.dto.ClientTypeDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequestMapping("/default")
public interface ClientTypeServiceEndpoint<E extends ClientTypeDTO, T extends Number> {

    /**
     * Returns all client types.
     *
     * @return all client types.
     */
    List<E> getAll();

    /**
     * Returns the client type with given id.
     *
     * @param id must not be {@literal null}.
     * @return the client type with the given id.
     */
    ResponseEntity<E> getById(T id);
}

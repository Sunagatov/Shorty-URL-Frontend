package com.zufar.client_service_api.client;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;


@FeignClient(name = "client-service", path = "clients")
public interface ClientService {


    /**
     * Returns whether an client with the given id exists.
     *
     * @param clientId must not be {@literal null}.
     * @return {@literal true} if an entity with the given id exists, {@literal false} otherwise.
     */
    @PostMapping(value = "client")
    @ResponseBody ResponseEntity<Boolean> isExists(@RequestBody Long clientId);
}

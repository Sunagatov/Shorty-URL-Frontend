package com.zufar.client_service_api.client;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;


@FeignClient(name = "client-service", path = "clients")
public interface ClientService {

    @PostMapping(value = "client")
    @ResponseBody ResponseEntity<Boolean> isClientExists(@RequestBody Long clientId);
}

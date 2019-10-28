package com.zufar.service;


import com.zufar.dto.OrderDTO;

import org.springframework.cloud.openfeign.FeignClient;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@FeignClient(name = "order-service", path = "orders")
public interface OrderService {

    @PostMapping(value = "client")
    @ResponseBody 
    ResponseEntity<List<OrderDTO>> getAllByClientId(@RequestBody Long clientId);

    @PostMapping(value = "delete")
    ResponseEntity deleteAllByClientId(@RequestBody Long clientId);
}

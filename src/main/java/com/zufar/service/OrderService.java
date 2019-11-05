package com.zufar.service;


import com.zufar.dto.OrderDTO;

import org.springframework.cloud.openfeign.FeignClient;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@FeignClient(name = "order-service", path = "orders")
public interface OrderService {

    @PostMapping(value = "client")
    @ResponseBody
    ResponseEntity<List<OrderDTO>> getAllByClientId(@RequestBody Long clientId);

    @DeleteMapping(value = "client/{clientId}")
    ResponseEntity deleteAllByClientId(@PathVariable Long clientId);
}

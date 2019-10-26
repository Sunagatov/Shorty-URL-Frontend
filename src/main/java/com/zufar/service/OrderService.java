package com.zufar.service;


import com.zufar.dto.Order;

import org.springframework.cloud.openfeign.FeignClient;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@FeignClient(name = "order-service", path = "orders")
public interface OrderService {

    @GetMapping(value = "client/{clientId}")
    @ResponseBody ResponseEntity<List<Order>> getOrders(@PathVariable("clientId") Long clientId);

    @PostMapping(value = "client")
    @ResponseBody ResponseEntity<List<Order>> getOrdersByIds(@RequestBody List<Long> orderIds);

    @DeleteMapping(value = "client/{clientId}")
    void deleteOrders(@PathVariable("clientId") Long clientId);
}

package com.zufar.client_service.service;


import com.zufar.client_service.dto.OrderDTO;
import org.springframework.cloud.openfeign.FeignClient;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.Collection;

@FeignClient(name = "order-service")
public interface OrderService {

    @GetMapping(value = "orders")
    Collection<OrderDTO> getOrders(@RequestBody Iterable<Long> ids);

    @GetMapping(value = "orders/{id}")
    OrderDTO getOrder(@PathVariable("id") Long clientId);

    @PostMapping(value = "/orders")
    OrderDTO saveOrder(@RequestBody OrderDTO order);

    @PutMapping(value = "/orders")
    OrderDTO updateOrder(@RequestBody OrderDTO order);

    @DeleteMapping(value = "orders/{id}")
    void deleteOrder(@PathVariable("id") Long id);

    @PostMapping(value = "orders")
    void deleteOrders(@RequestBody Iterable<Long> ids);
}

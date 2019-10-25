package com.zufar.service;


import com.zufar.dto.Order;
import org.springframework.cloud.openfeign.FeignClient;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;


import java.util.Collection;

@FeignClient(name = "order-service")
public interface OrderService {

    @GetMapping(value = "orders/clientId={id}")
    Collection<Order> getOrders(@PathVariable("id") Long clientId);
    
    @DeleteMapping(value = "orders/clientId={id}")
    void deleteOrders(@PathVariable("id") Long clientId);
}

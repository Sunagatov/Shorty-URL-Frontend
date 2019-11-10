package com.zufar.client_service_impl.repository;

import com.zufar.client_service_impl.entity.Client;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends CrudRepository<Client, Long> {}

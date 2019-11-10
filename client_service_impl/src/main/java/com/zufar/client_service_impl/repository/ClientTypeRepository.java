package com.zufar.client_service_impl.repository;

import com.zufar.client_service_impl.entity.ClientType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientTypeRepository extends CrudRepository<ClientType, Long> {}

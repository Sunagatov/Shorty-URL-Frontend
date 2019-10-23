package com.zufar.client_service.repository;

import com.zufar.client_service.entity.ClientType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientTypeRepository extends CrudRepository<ClientType, Long> {}

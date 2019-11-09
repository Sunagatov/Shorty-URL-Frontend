package com.zufar.repository;

import com.zufar.entity.ClientType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientTypeRepository extends CrudRepository<ClientType, Long> {}

package com.zufar.client_service_impl.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.SequenceGenerator;
import javax.persistence.Column;
import javax.persistence.GenerationType;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "types")
public class ClientType {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "type_sequence")
    @SequenceGenerator(name = "type_sequence", sequenceName = "type_seq")
    private Long id;

    @Column(name = "short_name", length = 60, nullable = false)
    private String shortName;

    @Column(name = "full_name", length = 60, nullable = false)
    private String fullName;

    @Column(name = "client_type_code", length = 10, nullable = false)
    private String typeCode;
}

package com.zufar.entity;

import io.swagger.annotations.ApiModelProperty;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.SequenceGenerator;
import javax.persistence.Column;
import javax.persistence.GenerationType;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "types")
public class ClientType {

    @ApiModelProperty(notes = "client type's id", name="id", required=true)
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "type_sequence")
    @SequenceGenerator(name = "type_sequence", sequenceName = "type_seq")
    private Long id;

    @ApiModelProperty(notes = "client type's short name", name="shortName", required=true)
    @Column(name = "short_name", length = 60, nullable = false)
    private String shortName;

    @ApiModelProperty(notes = "client type's full name", name="fullName", required=true)
    @Column(name = "full_name", length = 60, nullable = false)
    private String fullName;

    @ApiModelProperty(notes = "client type's code", name="typeCode", required=true)
    @Column(name = "client_type_code", length = 10, nullable = false)
    private String typeCode;
}

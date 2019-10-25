package com.zufar.entity;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.SequenceGenerator;
import javax.persistence.Column;
import javax.persistence.CollectionTable;
import javax.persistence.ElementCollection;
import javax.persistence.OneToOne;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.GenerationType;

import java.time.LocalDateTime;
import java.util.Set;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "clients")
public class Client {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "client_sequence")
    @SequenceGenerator(name = "client_sequence", sequenceName = "client_seq")
    private Long id;

    @Column(name = "short_name", length = 60, nullable = false)
    private String shortName;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @OneToOne(fetch = FetchType.EAGER)
    @Fetch(value = FetchMode.JOIN)
    @JoinColumn(name = "client_type")
    private ClientType clientType;
    
    @Column(name = "inn", length = 12, nullable = false)
    private String inn;

    @Column(name = "okpo", length = 10)
    private String okpo;

    @ElementCollection
    @CollectionTable(name = "client_orders", joinColumns = @JoinColumn(name = "client_id"))
    @Column(name = "order_id")
    private Set<Long> orders;

    @Column(name = "creation_date", nullable = false)
    private LocalDateTime creationDate;

    @Column(name = "modification_date", nullable = false)
    private LocalDateTime modificationDate;
}

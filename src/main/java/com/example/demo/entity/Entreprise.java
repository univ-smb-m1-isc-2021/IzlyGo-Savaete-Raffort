package com.example.demo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;



import lombok.Data;

import java.util.List;

@Entity
@Data
public class Entreprise{

    @Id
    @Column
    private long id;

    @Column
    @NotNull(message="{NotNull.Entreprise.num_siret}")
    private int num_siret;

    @Column
    @NotNull(message="{NotNull.Entreprise.nom}")
    private String nom;

}



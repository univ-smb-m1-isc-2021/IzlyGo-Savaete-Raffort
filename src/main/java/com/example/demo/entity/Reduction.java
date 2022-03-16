package com.example.demo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;

import javax.validation.constraints.NotNull;



import lombok.Data;

import java.util.List;

@Entity
@Data
public class Reduction{

    @Id
    @Column
    private long id;

    @Column
    @NotNull(message="{NotNull.Reduction.points_requis}")
    private int points_requis;

    @ManyToOne
    @JoinColumn(name = "id_entreprise")
    private Entreprise entreprise;

    @Column
    @NotNull(message="{NotNull.Reduction.libelle}")
    private String libelle;

}



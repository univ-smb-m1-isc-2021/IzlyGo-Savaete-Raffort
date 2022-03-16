package com.example.demo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;


import lombok.Data;

import java.util.List;

@Entity
@Data
public class Etudiant{

    @Id
    @Column
    private long numero;

    @Column
    @NotNull(message="{NotNull.Etudiant.nom}")
    private String nom;

    @Column
    @NotNull(message="{NotNull.Etudiant.prenom}")
    private String prenom;

    @Column
    @NotNull(message="{NotNull.Etudiant.mail}")
    private String mail;

    @Column
    @NotNull(message="{NotNull.Etudiant.formation_id}")
    private int formation_id;

    @Column
    @NotNull(message="{NotNull.Etudiant.nombre_points}")
    private int nombre_points;


}



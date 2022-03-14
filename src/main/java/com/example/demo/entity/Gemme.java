package com.example.demo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;


import lombok.Data;

@Entity
@Data
public class Gemme{

    @Id
    @Column
    private long id;

    @Column
    @NotNull(message="{NotNull.Etudiant.nom}")
    private String nom;

    @Column
    @NotNull(message="{NotNull.Etudiant.prenom}")
    private String couleur;

    @Column
    @NotNull(message="{NotNull.Etudiant.mail}")
    private float proba;

    @Column
    @NotNull(message="{NotNull.Etudiant.formation_id}")
    private int personne_max;

    @Column
    @NotNull(message="{NotNull.Etudiant.mail}")
    private int valeur;



}

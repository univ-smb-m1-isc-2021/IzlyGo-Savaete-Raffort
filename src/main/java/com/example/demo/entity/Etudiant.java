package com.example.demo.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;


import lombok.Data;

import java.util.List;

@Entity
@Data
public class Etudiant{

    @Id
    @Column
    private long numero;

    public long getNumero() {
        return numero;
    }

    @Column
    @NotNull(message="{NotNull.Etudiant.nom}")
    private String nom;

    public String getNom() {
        return nom;
    }

    @Column
    @NotNull(message="{NotNull.Etudiant.prenom}")
    private String prenom;

    public String getPrenom() {
        return prenom;
    }

    @Column
    @NotNull(message="{NotNull.Etudiant.mail}")
    private String mail;

    public String getMail() {
        return mail;
    }

    @ManyToOne
    @JoinColumn(name = "formation_id")
    private Formation formation;

    public Formation getFormation() {
        return formation;
    }

    @Column
    @NotNull(message="{NotNull.Etudiant.nombre_points}")
    private int nombre_points;

    public int getNombre_points() {
        return nombre_points;
    }
}



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
    @NotNull(message="{NotNull.Etudiant.password}")
    public String password;

    public String getPassword() {
        return password;
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

    private int nombre_points_semaine;

    public int getNombrePointsSemaine() {
        return nombre_points_semaine;
    }

    @Column
    @NotNull(message="{NotNull.Etudiant.password}")
    public Boolean compte_actif;

    public Boolean estActif() {
        return compte_actif;
    }


    public String code_parrainage;

    public String getCodeParrainage() {
        return code_parrainage;
    }

    public void setCodeParrainage(String code_parrainage) {
        this.code_parrainage = code_parrainage;
    }

    public String date_inscription;

    public String getDateInscription() {
        return date_inscription;
    }

    public void setDateInscription(String date_inscription) {
        this.date_inscription = date_inscription;
    }

    public String code_parrain;

    public String getCodeParrain() {
        return code_parrain;
    }

    public void setCode_parrain(String code_parrain) {
        this.code_parrain = code_parrain;
    }

    public String nom_personnage;


    public int nombre_badge;

}



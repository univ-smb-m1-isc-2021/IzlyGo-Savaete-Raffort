package com.example.demo.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.Data;

import java.util.List;

@Entity
@Data
public class Obtention{

    @Id
    @Column
    private long id;

    @Column
    private String chaine;

    public String getChaine() {
        return chaine;
    }

    public void setChaine(String chaine) {
        this.chaine = chaine;
    }

    @Column
    private int id_etudiant;

    public int getIdEtudiant() {
        return id_etudiant;
    }

    public void setIdEtudiant(int id_etudiant) {
        this.id_etudiant = id_etudiant;
    }
}



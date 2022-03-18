package com.example.demo.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;


import lombok.Data;

import java.util.List;

@Entity
@Data
public class Notification{

    @Id
    @Column
    private long id;

    public long getId() {
        return id;
    }

    @ManyToOne
    @JoinColumn(name = "id_etudiant")
    private Etudiant etudiant;

    public Etudiant getEtudiant() {
        return etudiant;
    }

    @ManyToOne
    @JoinColumn(name = "id_gemme")
    private Gemme gemme;

    public Gemme getGemme() {
        return gemme;
    }

    @Column
    @NotNull(message="{NotNull.Notification.nombre_points}")
    private boolean etat;

    public boolean getEtat() {
        return etat;
    }
}



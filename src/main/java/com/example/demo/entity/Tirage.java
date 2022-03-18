package com.example.demo.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;


import lombok.Data;

@Entity
@Data
public class Tirage{

    @Id
    @Column
    private long id;

    @Column
    @NotNull(message="{NotNull.Tirage.jour}")
    private String jour;

    public String getJour() {
        return jour;
    }

    @Column
    @NotNull(message="{NotNull.Tirage.heure}")
    private int heure;

    public int getHeure() {
        return heure;
    }

    @Column
    @NotNull(message="{NotNull.Tirage.minute}")
    private int minute;

    public int getMinute() {
        return minute;
    }

    @ManyToOne
    @JoinColumn(name = "id_gemme")
    private Gemme gemme;

    public Gemme getGemme() {
        return gemme;
    }

    @Column
    @NotNull(message="{NotNull.Tirage.nombre_recupere}")
    private int nombre_recupere;

    public int getNombre_recupere() {
        return nombre_recupere;
    }

    @Column
    @NotNull(message="{NotNull.Tirage.latitude}")
    private float latitude;

    public float getLatitude() {
        return latitude;
    }

    @Column
    @NotNull(message="{NotNull.Tirage.longitude}")
    private float longitude;

    public float getLongitude() {
        return longitude;
    }

    @Column
    @NotNull(message="{NotNull.Tirage.chaine}")
    private String chaine;

    public String getChaine() {
        return chaine;
    }
}

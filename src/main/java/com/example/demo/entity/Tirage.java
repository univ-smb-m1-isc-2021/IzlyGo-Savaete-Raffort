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

    @Column
    @NotNull(message="{NotNull.Tirage.heure}")
    private int heure;

    @Column
    @NotNull(message="{NotNull.Tirage.minute}")
    private int minute;

    @ManyToOne
    @JoinColumn(name = "id_gemme")
    private Gemme gemme;

    @Column
    @NotNull(message="{NotNull.Tirage.nombre_recupere}")
    private int nombre_recupere;

    @Column
    @NotNull(message="{NotNull.Tirage.latitude}")
    private float latitude;

    @Column
    @NotNull(message="{NotNull.Tirage.longitude}")
    private float longitude;

    @Column
    @NotNull(message="{NotNull.Tirage.chaine}")
    private String chaine;


}

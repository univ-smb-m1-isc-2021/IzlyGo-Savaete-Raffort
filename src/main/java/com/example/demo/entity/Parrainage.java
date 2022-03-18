package com.example.demo.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;



import lombok.Data;

import java.util.List;

@Entity
@Data
public class Parrainage{

    @Id
    @Column
    private long id;

    @ManyToOne
    @JoinColumn(name = "id_parrain")
    private Etudiant parrain;

    public Etudiant getParrain() {
        return parrain;
    }

    @ManyToOne
    @JoinColumn(name = "id_filleul")
    private Etudiant filleul;

    public Etudiant getFilleul() {
        return filleul;
    }
}



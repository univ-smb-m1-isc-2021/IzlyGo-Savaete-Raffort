package com.example.demo.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import com.example.demo.service.*;


import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;

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

    private int nombre_points;
    public int getNombre_points() {
        return nombre_points;
    }

    private int nombre_points_semaine;
    public int getNombrePointsSemaine() {
        return nombre_points_semaine;
    }

    public Boolean compte_actif = true;
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

    public String nom_personnage = "personnage1";

    public int nombre_badge = 0;


    public Etudiant(){}


    public Etudiant ajouteEtudiant(long numero, String nom, String prenom, String password, String mail, Formation formation, Etudiant parrain){
        this.numero = numero;
        this.nom = nom;
        this.prenom = prenom;
        this.password = password;
        this.mail = mail;
        this.formation = formation;


        // Code parrainage
        String part1 = this.getNom().toUpperCase();
        String part2 = this.getPrenom().substring(0,2).toUpperCase();
        String part3 = String.valueOf(getRandomNumberInt(10,99));
        this.setCodeParrainage(part1 + part2 + part3);

        // Date d'inscription
        LocalDateTime now = LocalDateTime.now();
        String mois = now.getMonth().getDisplayName(TextStyle.FULL, Locale.FRANCE);
        this.setDateInscription(now.getDayOfMonth() + " " + mois + " " + now.getYear());

        if (parrain == null) { this.setCode_parrain(null); }
        else {this.setCode_parrain(parrain.getCode_parrainage());}

        /*this.code_parrainage = code_parrainage;
        this.date_inscription = date_inscription;
        this.code_parrain = code_parrain;*/

        this.nombre_points = 0;
        this.nombre_points_semaine = 0;
        this.compte_actif = true;
        this.nom_personnage = "personnage1";
        this.nombre_badge = 0;



        return this;
    }




    private int getRandomNumberInt(int min, int max) {
        return (int) ((Math.random() * (max - min)) + min);
    }

}



DROP TABLE IF EXISTS formation;
DROP TABLE IF EXISTS inventaire;
DROP TABLE IF EXISTS etudiant;
DROP TABLE IF EXISTS tirage;
DROP TABLE IF EXISTS gemme;

DROP TABLE IF EXISTS reduction;
DROP TABLE IF EXISTS entreprise;


CREATE TABLE formation (
  ID INT PRIMARY KEY,
  LIBELLE VARCHAR(250) NOT NULL,
  CHEMIN VARCHAR(250) NOT NULL
);

CREATE TABLE etudiant (
   NUMERO INT PRIMARY KEY,
   NOM VARCHAR(250) NOT NULL,
   PRENOM VARCHAR(250) NOT NULL,
   MAIL VARCHAR(250) NOT NULL,
   FORMATION_ID INT NOT NULL,
   FOREIGN KEY (FORMATION_ID) REFERENCES formation(ID),
   NOMBRE_POINTS INT NOT NULL DEFAULT 0
);

CREATE TABLE gemme (
    ID INT PRIMARY KEY,
    NOM VARCHAR (50) NOT NULL,
    COULEUR VARCHAR (30) NOT NULL,
    PROBA FLOAT NOT NULL,
    PROBA_MIN FLOAT NOT NULL,
    PROBA_MAX FLOAT NOT NULL,
    PERSONNE_MAX INT NOT NULL,
    VALEUR INT NOT NULL,
    CHEMIN_IMAGE VARCHAR(100) NOT NULL
);

CREATE TABLE inventaire
(
    ID INT PRIMARY KEY,
    ID_ETUDIANT INT NOT NULL,
    ID_GEMME    INT NOT NULL,
    QUANTITE    INT NOT NULL DEFAULT 0,
    VALEUR_POINT INT NOT NULL DEFAULT 0,
    VALEUR_EURO INT NOT NULL DEFAULT 0,

    FOREIGN KEY (ID_ETUDIANT) REFERENCES etudiant(NUMERO)
);


CREATE TABLE tirage
(
    ID INT PRIMARY KEY,
    JOUR VARCHAR(30) NOT NULL,
    HEURE INT NOT NULL,
    MINUTE INT NOT NULL,
    ID_GEMME INT NOT NULL,
    NOMBRE_RECUPERE INT NOT NULL,
    LATITUDE FLOAT NOT NULL,
    LONGITUDE FLOAT NOT NULL,
    CHAINE VARCHAR(100) NOT NULL,

    FOREIGN KEY (ID_GEMME) REFERENCES gemme(ID)
);

CREATE TABLE entreprise
(
    ID INT PRIMARY KEY,
    NUM_SIRET INT NOT NULL,
    NOM VARCHAR(100) NOT NULL
);

CREATE TABLE reduction
(
    ID INT PRIMARY KEY,
    POINTS_REQUIS INT NOT NULL,
    ID_ENTREPRISE INT NOT NULL,
    LIBELLE VARCHAR(100) NOT NULL,

    FOREIGN KEY (ID_ENTREPRISE) REFERENCES entreprise(ID)
);

INSERT INTO formation (ID, LIBELLE, CHEMIN) VALUES
  (1, 'M1 INFO Groupe 1', 'M1/INFO/1'),
  (2, 'M1 INFO Groupe 2', 'M1/INFO/2');

INSERT INTO etudiant (NUMERO, NOM, PRENOM, MAIL, FORMATION_ID) VALUES
    (123, 'RAFFORT', 'Adrien', 'adrien73400@icloud.com', 2),
(456, 'RAFFORT', 'Adrien', 'adrien73400@icloud.com', 2);


INSERT INTO gemme(id, nom, couleur, proba, proba_min, proba_max, personne_max, valeur, CHEMIN_IMAGE) VALUES
(1, 'Rubis', 'E86967', 0.07, 94, 100, 10, 100, 'rubis'), /*TODO 0.07 au lieu de 0.05 en attendant les objets*/
(2, 'Saphir', '80C6F1', 0.1, 84, 93, 20, 80, 'saphir'),
(3, 'Emeraude', '61D6B9', 0.15, 69, 83, 50, 50, 'emeraude'),
(4, 'Améthyste', 'B58CE7', 0.18, 51, 68, 5000, 10, 'amethyste'),
(5, 'Tourmaline', '363F4A', 0.3, 21, 50, 5000, 5, 'tourmaline'),
(6, 'Ambre', 'EAAE7B', 0.2, 1, 20, 5000, 1, 'ambre');



INSERT INTO inventaire(id, id_etudiant, id_gemme, quantite) VALUES
(1, 123, 1, 1),
(2, 123, 2, 2),
(3, 123, 3, 5),
(4, 123, 4, 6),
(5, 123, 5, 6),
(6, 123, 6, 20),

(7,456, 1, 0),
(8, 456, 2, 1),
(9, 456, 3, 8),
(10, 456, 4, 0),
(11, 456, 5, 9),
(12, 456, 6, 11);


INSERT INTO entreprise(id, num_siret, nom) VALUES
(1, 156516, 'Boulangerie La Panière'),
(2, 256272, 'Bar La Flouz');

INSERT INTO reduction(id, points_requis, id_entreprise, libelle) VALUES
(1, 1700, 1, '37% de remise sur les pains aux chocolats'),
(2, 800, 1, 'Un panini offert pour 3 pains achetés'),
(3, 400, 2, '15% sur un large produit de bière');




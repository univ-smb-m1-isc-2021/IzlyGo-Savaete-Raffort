import static org.junit.jupiter.api.Assertions.*;

import com.example.demo.entity.Etudiant;
import com.example.demo.entity.Formation;
import com.example.demo.controller.EtudiantController;


import org.junit.jupiter.api.Test;

class mesTests {

    @Test
    void test1() {

        Formation formation = new Formation(20, "M1 INFOOO", "LECHEMIN");

        Etudiant etu = new Etudiant().ajouteEtudiant(87917, "NOM", "PRENOM", "PASSWORD", "MAIL", formation, null);

        assertEquals(etu.getDateInscription(), "11 avril 2022");
    }


}

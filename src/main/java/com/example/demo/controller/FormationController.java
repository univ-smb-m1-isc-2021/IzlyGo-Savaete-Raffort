package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Formation;
import com.example.demo.service.FormationService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/")
public class FormationController {

	@Autowired
    FormationService formationService;

	@GetMapping(path = "/formations")
    public ResponseEntity<?> listFormations() {
        log.info("FormationController:  list formations");
        List<Formation> resource = formationService.getFormations();
        return ResponseEntity.ok(resource);
    }

}

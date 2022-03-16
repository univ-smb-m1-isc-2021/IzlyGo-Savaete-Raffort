package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Reduction;
import com.example.demo.service.ReductionService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/")
public class ReductionController {

    @Autowired
    ReductionService reductionService;

    @GetMapping(path = "/reductions")
    public ResponseEntity<?> donneReductions() {

        List<Reduction> resource = reductionService.donneToutesLesReductions();
        return ResponseEntity.ok(resource);
    }

}

package com.example.demo.controller;

import java.util.List;

import com.example.demo.entity.Reduction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Gemme;
import com.example.demo.service.GemmeService;

import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/")
public class GemmeController {

    @Autowired
    GemmeService gemmeService;


    @GetMapping(path = "/gemmes")
    public ResponseEntity<?> donneListeGemmes() {

        List<Gemme> gemmes = gemmeService.donneListeGemmes();
        return ResponseEntity.ok(gemmes);
    }

}

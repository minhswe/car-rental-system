package com.github.minhswe.carrental.modules.car.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cars")
public class VehicleController {
    @GetMapping("/hello")
    public String hello() {
        return "Hello, Car!";
    };
};

package com.github.minhswe.carrental.common.utils;

import java.security.SecureRandom;
import java.util.Base64;

public class GenerateJwtSecret {
    public static void main(String[] args) {
        byte[] key = new byte[64]; // 512 bits = cực mạnh, đủ cho HS512
        new SecureRandom().nextBytes(key);
        String secret = Base64.getEncoder().encodeToString(key);
        System.out.println("JWT Secret: " + secret);
    }
}

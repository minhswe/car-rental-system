package com.github.minhswe.carrental.common.serurity;

import com.github.minhswe.carrental.modules.user.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtService {

   private final JwtProperties jwtProperties;

    public String generateAccessToken(User user){
        Map<String, Object> claims = Map.of(
                "type", "access",
                "userId", user.getId(),
                "role", user.getRole()
        );

        return buildToken(claims, String.valueOf(user.getId()), jwtProperties.getAccessTokenExpirationMs());
    }

    public String generateRefreshToken(User user){
        Map<String, Object> claims = Map.of(
                "type", "refresh",
                "userId", user.getId()
        );

        return buildToken(claims, String.valueOf(user.getId()), jwtProperties.getRefreshTokenExpirationMs());
    }

    private String buildToken(Map<String, Object> claims, String subject, long expiration){
        return Jwts.builder()
                .claims(claims)
                .subject(subject)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+ expiration))
                .signWith(getSigningKey(), Jwts.SIG.HS512)
                .compact();
    }

    //Token validation and parsing

    public boolean isTokenValid(String token, String userId){
        try{
            final String tokenUsername = extractUsername(token);
            return (tokenUsername.equals(userId)) && !isTokenExpired(token);
        } catch (JwtException e){
            return false;
        }
    }

    public boolean isAccessToken(String token){
        return "access".equals(extractClaim(token, claims -> claims.get("type")));
    }

    public boolean isRefreshToken(String token){
        return "refresh".equals((extractClaim(token, claims -> claims.get("type"))));
    }

    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }

    public String extractUserId(String token){
        Object id = extractClaim(token, claims -> claims.get("userId"));
        return id != null ? id.toString() : null;
    }

    private boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }


    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token){

            return Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = Base64.getDecoder().decode(jwtProperties.getSecret());
        return Keys.hmacShaKeyFor(keyBytes);
    }
}

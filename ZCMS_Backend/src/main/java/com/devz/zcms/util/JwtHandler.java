package com.devz.zcms.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.devz.zcms.constant.SecurityConstant;
import com.devz.zcms.domain.UserPrinciple;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static com.devz.zcms.constant.SecurityConstant.SECRET_KEY;

@Component
public class JwtHandler {

    public Mono<Authentication> validateAndGetAuthentication(String jwtToken) {
        String username = getSubject(jwtToken);
        var authorities = getAuthorities(jwtToken);
        return isTokenValid(jwtToken) ?
                Mono.just(new UsernamePasswordAuthenticationToken(username, null, authorities)) : Mono.empty();
    }

    public String generateJwtToken(UserPrinciple userPrinciple){
        return JWT.create()
                .withIssuer(SecurityConstant.DEVZ_FREELANCER)
                .withArrayClaim(SecurityConstant.AUTHORITIES, getClaimsFromUserPrinciple(userPrinciple))
                .withExpiresAt(new Date(System.currentTimeMillis() + SecurityConstant.EXPIRATION_TIME))
                .withSubject(userPrinciple.getUsername())
                .sign(Algorithm.HMAC512(SECRET_KEY));
    }


    private String getSubject(String token){
        return getJWTVerifier().verify(token).getSubject();
    }

    public List<GrantedAuthority> getAuthorities(String token){
        String[] claims = getClaimsFromToken(token);
        return Arrays.stream(claims).map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

    public String[] getClaimsFromToken(String token) {
        return getJWTVerifier().verify(token).getClaim(SecurityConstant.AUTHORITIES).asArray(String.class);
    }

    private String[] getClaimsFromUserPrinciple(UserPrinciple userPrinciple) {
        List<String> authorities = new ArrayList<>();
        userPrinciple.getAuthorities().forEach(grantedAuthority -> authorities.add(grantedAuthority.getAuthority()));
        return authorities.toArray(new String[0]);
    }

    private boolean isTokenValid(String jwtToken){
        return !isTokenExpired(jwtToken);
    }

    private boolean isTokenExpired(String token) {
        Date expireDate = getJWTVerifier().verify(token).getExpiresAt();
        return new Date().after(expireDate);
    }

    private Mono<DecodedJWT> verifyToken(String token){
        return Mono.just(getJWTVerifier().verify(token));
    }

    private JWTVerifier getJWTVerifier() {
        return JWT.require(Algorithm.HMAC512(SECRET_KEY))
                .withIssuer(SecurityConstant.DEVZ_FREELANCER)
                .build();
    }
}

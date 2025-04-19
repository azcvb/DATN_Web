package com.datn.sellWatches.Configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.stereotype.Component;

import com.datn.sellWatches.Service.AuthenticationService;

@Component
public class CustomJwtDecoder implements JwtDecoder{
	 @Value("${jwt.signerKey}")
	 private String signerKey;

	 @Autowired
	 private AuthenticationService authenticationService;

	 private NimbusJwtDecoder nimbusJwtDecoder = null;
	 
	@Override
	public Jwt decode(String token) throws JwtException {
		// TODO Auto-generated method stub
		return null;
	}

}

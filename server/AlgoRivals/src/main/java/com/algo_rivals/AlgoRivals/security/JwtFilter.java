package com.algo_rivals.AlgoRivals.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@Service
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    // Everytime we have a request, this method will be called
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull  HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        if (request.getServletPath().contains("/api/v1/auth")){
            filterChain.doFilter(request,response);
            return;
        }

        final String authHeader = request.getHeader(AUTHORIZATION);
        final String jwt;
        final String userEmail;

        if (authHeader == null || !authHeader.startsWith("Bearer ")){
            filterChain.doFilter(request,response);
            return;
        }

        // Extracting the jwt token from the header
        jwt = authHeader.substring(7);
        // Extracting the username from the jwt token
        userEmail = jwtService.extractUsername(jwt);
        //TODO extracts email

        // If the user email is not null and the user is not authenticated
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null){

            //TODO
            UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);
            if (jwtService.isTokenValid(jwt, userDetails)){
                // Used by security later on to check if the user is authenticated
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                );

                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                // Manual authentication because all the checks are done
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }

        }
        filterChain.doFilter(request,response);
    }


}

package com.algo_rivals.AlgoRivals.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.Customizer.withDefaults;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity(securedEnabled = true) // role based security
public class SecurityConfig {

    // you do not need to autowire the JwtFilter and AuthenticationProvider as you are using the @RequiredArgsConstructor annotation
    private final JwtFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
          http.cors(withDefaults())
                 .csrf(AbstractHttpConfigurer::disable)
                 .authorizeHttpRequests(req ->
                         req.requestMatchers( "/auth/**",
                                         "/v2/api-docs",
                                         "/v3/api-docs",
                                         "/v3/api-docs/**",
                                         "/swagger-resources",
                                         "/swagger-resources/**",
                                         "/configuration/ui",
                                         "/configuration/security",
                                         "/swagger-ui/**",
                                         "/webjars/**",
                                         "/swagger-ui.html")
                                 .permitAll().anyRequest()
                                 .authenticated()
                        ).sessionManagement(session->
                         session.sessionCreationPolicy(STATELESS))//spring should not store the session state in its context
                 .authenticationProvider(authenticationProvider) // Custom authentication provider
                 .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class); // Custom filter

        return http.build();

    }

}

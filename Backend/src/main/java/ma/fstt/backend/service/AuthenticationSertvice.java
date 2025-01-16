package ma.fstt.backend.service;

import ma.fstt.backend.security.JwtConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthenticationSertvice {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtConfig jwtConfig;
    @Autowired
    private UserDetailsService userDetailsService;

    public String authenticateAndGenerateToken(String username, String password) throws Exception {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        List<String> roles = userDetails.getAuthorities().stream()
                .map(authority -> authority.getAuthority())
                .collect(Collectors.toList());
        return  jwtConfig.generateToken(username,roles);
    }
}

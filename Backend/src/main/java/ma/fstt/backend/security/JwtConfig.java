package ma.fstt.backend.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.security.SignatureException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;

@Configuration
public class JwtConfig {
    @Autowired
    private DataSource dataSource;

   public String SecretKey="2722e6648a2a10ba4b772d7f6c9ad5ca9a5fb1b7791e5be35fcfcb11ddf76a7f";
    public String generateToken(String username, List<String> roles) {

        final long currentTime = System.currentTimeMillis();
        final long expirationTime =currentTime+60*60*1000;

        return Jwts.builder()
                .setSubject(username)
                .claim("roles", roles)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(SignatureAlgorithm.HS512, SecretKey.getBytes())
                .compact();
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(SecretKey.getBytes()).build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public List<String> getRolesFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(SecretKey.getBytes()).build()
                .parseClaimsJws(token)
                .getBody();
        return (List<String>) claims.get("roles");
    }
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SecretKey.getBytes()).build().parseClaimsJws(token);
            return true;
        } catch (  MalformedJwtException | ExpiredJwtException | UnsupportedJwtException | IllegalArgumentException e) {
            // Handle the exception appropriately
            return false;
        }
    }


    public void setUserContext(String username) {
        try (Connection connection = dataSource.getConnection();
             PreparedStatement stmt = connection.prepareStatement("BEGIN DBMS_SESSION.SET_IDENTIFIER(?); END;")) {
            stmt.setString(1, username);
            stmt.execute();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}


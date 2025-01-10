//package ma.fstt.backend.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.context.annotation.Bean;
//import org.springframework.security.web.firewall.HttpFirewall;
//import org.springframework.security.web.firewall.StrictHttpFirewall;
//
//import static org.springframework.security.config.Customizer.withDefaults;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//   @Bean
//public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//    http.csrf(csrf -> csrf.disable())
//            .authorizeHttpRequests(auth -> auth
//                .requestMatchers("/rman/fullBackup","/rman/incrementalBackup","/rman/test",
//                        "/rman/restore_recover","/rman/restoreByDate","/backups/execute","/rman/testDockerCommand","/rman/list_Backup").permitAll() // Allow unauthenticated access to RMAN endpoints
//                .anyRequest().authenticated()
//            )
//            .httpBasic(withDefaults()); // Enable basic authentication
//    return http.build();
//}
//
//    @Bean
//    public HttpFirewall allowUrlEncodedPercent() {
//        StrictHttpFirewall firewall = new StrictHttpFirewall();
//        // Allow encoded newline and other necessary characters
//        firewall.setAllowUrlEncodedSlash(true);
//        firewall.setAllowUrlEncodedPercent(true);
//        firewall.setAllowUrlEncodedPeriod(true);
//        firewall.setAllowBackSlash(true);
//        firewall.setAllowSemicolon(true);
//        return firewall;
//    }
//}
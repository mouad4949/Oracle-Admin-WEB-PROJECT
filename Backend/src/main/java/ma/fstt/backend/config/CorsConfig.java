package ma.fstt.backend.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // This applies to all endpoints
                .allowedOrigins(
                        "http://localhost:3000",  // React default port
                        "http://localhost:4200",  // Angular default port
                        "http://localhost:5173",  // Vite default port
                        "http://127.0.0.1:5173"  // Vite alternative URL
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}

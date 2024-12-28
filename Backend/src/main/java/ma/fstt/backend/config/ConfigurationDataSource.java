package ma.fstt.backend.config;
import javax.sql.DataSource;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;

import org.springframework.context.annotation.Primary;


public class ConfigurationDataSource {

    @Bean
    @Primary
    @ConfigurationProperties(prefix="spring.datasource")
    public DataSource dataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "systemDataSource")
    @ConfigurationProperties(prefix="system.datasource")
    public DataSource systemDataSource() {
        return DataSourceBuilder.create().build();
    }
}

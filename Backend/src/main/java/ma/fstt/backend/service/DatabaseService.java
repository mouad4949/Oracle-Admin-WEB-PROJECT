package ma.fstt.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class DatabaseService {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public DatabaseService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void executeSql(String plsql) throws DataAccessException {
            jdbcTemplate.execute(plsql);
    }

    public List<Map<String, Object>> executeSelectSql(String sql) throws DataAccessException {
        return jdbcTemplate.queryForList(sql);
    }
}

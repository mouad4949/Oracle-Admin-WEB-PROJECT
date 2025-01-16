package ma.fstt.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class SecurityService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void enableTDE(String tableName, String columnName) {
        String sql = "ALTER TABLE " + tableName + " MODIFY (" + columnName + " ENCRYPT USING 'AES256')";
        jdbcTemplate.execute(sql);
    }//anverefier hdi b select * from table b wa7d luser

    public void enableAudit(String action) {
        String sql = "AUDIT " + action;
        jdbcTemplate.execute(sql);
    }


    public void createPolicy(String fonction, String tableName, String fonctionName,String policyName) {
        jdbcTemplate.execute(fonction);

        String plsqlBlock =
                "BEGIN " +
                        "  DBMS_RLS.ADD_POLICY( " +
                        "    OBJECT_SCHEMA   => 'springuser', " +
                        "    OBJECT_NAME     => '" + tableName + "', " +
                        "    POLICY_NAME     =>'" + policyName + "', " +
                        "    FUNCTION_SCHEMA => 'springuser', " +
                        "    POLICY_FUNCTION => '" + fonctionName + "' " +
                        "  ); " +
                        "END;";

        jdbcTemplate.execute(plsqlBlock);
    }

}

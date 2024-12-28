package ma.fstt.backend.controllers;

import ma.fstt.backend.entities.SlowQuery;
import ma.fstt.backend.service.OptimizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/optimization")
public class OptimizationController {
    @Autowired
    private OptimizationService optimizationService;
//consultation des requetes lentes
    @GetMapping("/slow-queries")
    public List<SlowQuery> getSlowQueries() throws SQLException {
        return optimizationService.getSlowQueries();
    }

    @GetMapping("/run-sql-tuning")
    public String runSQLTuning(@RequestParam("sqlId") String sqlId) throws SQLException {
        optimizationService.runSQLTuningAdvisor(sqlId);
        return "SQL Tuning advisor lancé pour sql_id: "+sqlId;
    }

    @GetMapping("/recalculate-statistics")
    public String recalculateStatistics() throws SQLException {
        optimizationService.recalculateStatistics();
        return "Recalcul des statistiques lancé";
    }

}
package ma.fstt.backend.controllers;

import ma.fstt.backend.entities.SlowQuery;
import ma.fstt.backend.service.OptimizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;
@CrossOrigin(origins = "https://localhost:3000")
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

    @GetMapping("/sql-tuning-advisor")
    public ResponseEntity<String> runSQLTuningAdvisor(@RequestParam String sqlId) {
        try {
            String report =  optimizationService.runSQLTuningAdvisor(sqlId);
            return new ResponseEntity<>(report, HttpStatus.OK);
        } catch (SQLException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/recalculate-statistics")
    public String recalculateStatistics() throws SQLException {
        optimizationService.recalculateStatistics();
        return "Recalcul des statistiques lancé";
    }

}
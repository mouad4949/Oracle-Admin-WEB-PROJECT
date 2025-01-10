package ma.fstt.backend.controllers;

import ma.fstt.backend.entities.StatisticsJob;
import ma.fstt.backend.service.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.sql.SQLException;
import java.util.List;
@CrossOrigin(origins = "https://localhost:3000")
@RestController
@RequestMapping("/api/statistics")

public class StatisticsController {
    @Autowired
    private StatisticsService statisticsService;
    @PostMapping("/table-stats")
    public ResponseEntity<String> scheduleTableStatsJob(@RequestBody StatisticsJob job) {
        try {
            statisticsService.scheduleTableStatsJob(job);
            return new ResponseEntity<>("Table statistics job scheduled successfully", HttpStatus.CREATED);
        } catch (SQLException ex) {
            return new ResponseEntity<>(ex.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/schema-stats")
    public ResponseEntity<String> scheduleSchemaStatsJob(@RequestBody StatisticsJob job) {
        try {
            statisticsService.scheduleSchemaStatsJob(job);
            return new ResponseEntity<>("Schema statistics job scheduled successfully", HttpStatus.CREATED);
        } catch (SQLException ex) {
            return new ResponseEntity<>(ex.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/database-stats")
    public ResponseEntity<String> scheduleDatabaseStatsJob(@RequestBody StatisticsJob job) {
        try {
            statisticsService.scheduleDatabaseStatsJob(job);
            return new ResponseEntity<>("Database statistics job scheduled successfully", HttpStatus.CREATED);
        } catch (SQLException ex) {
            return new ResponseEntity<>(ex.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/scheduled-jobs")
    public ResponseEntity<List<StatisticsJob>> listScheduledJobs() {
        try {
            List<StatisticsJob> jobs = statisticsService.listScheduledJobs();
            return new ResponseEntity<>(jobs, HttpStatus.OK);
        } catch (SQLException ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/scheduled-jobs/{jobName}")
    public ResponseEntity<String> removeScheduledJob(@PathVariable String jobName) {
        try {
            statisticsService.removeScheduledJob(jobName);
            return new ResponseEntity<>("Job "+jobName+" supprimé avec succés", HttpStatus.OK);
        } catch (SQLException ex) {
            return new ResponseEntity<>(ex.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
    }
}
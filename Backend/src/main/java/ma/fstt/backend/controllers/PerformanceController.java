package ma.fstt.backend.controllers;

import ma.fstt.backend.entities.AWRReport;
import ma.fstt.backend.entities.ASHReport;
import ma.fstt.backend.entities.ResourceUsage;
import ma.fstt.backend.service.PerformanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.sql.SQLException;
import java.util.List;
@CrossOrigin(origins = "https://localhost:3000")
@RestController
@RequestMapping("/api/performance")
public class PerformanceController {

    @Autowired
    private PerformanceService performanceService;

    @GetMapping("/awr-reports")
    public List<AWRReport> getAWRReports() throws SQLException {
        return performanceService.getAWRReports();
    }

    @GetMapping("/ash-reports")
    public List<ASHReport> getASHReports() throws SQLException {
        return performanceService.getASHReports();
    }

    @GetMapping("/resource-usage")
    public ResourceUsage getResourceUsage() throws SQLException {
        ResourceUsage usage = performanceService.getResourceUsage();
        return usage;
    }
}
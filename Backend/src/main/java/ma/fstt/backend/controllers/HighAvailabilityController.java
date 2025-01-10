package ma.fstt.backend.controllers;


import ma.fstt.backend.entities.DataGuardStatus;
import ma.fstt.backend.service.HighAvailabilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.sql.SQLException;
@CrossOrigin(origins = "https://localhost:3000")
@RestController
@RequestMapping("/api/ha")
public class HighAvailabilityController {

    @Autowired
    private HighAvailabilityService highAvailabilityService;

    @GetMapping("/data-guard-status")
    public DataGuardStatus getDataGuardStatus() throws SQLException {
        return highAvailabilityService.getDataGuardStatus();
    }

    @GetMapping("/simulate-failover")
    public String simulateFailover() throws SQLException {
        highAvailabilityService.simulateFailover();
        return "Simulation failover lancé";
    }

    @GetMapping("/simulate-failback")
    public String simulateFailback() throws SQLException {
        highAvailabilityService.simulateFailback();
        return "Simulation failback lancé";
    }
}
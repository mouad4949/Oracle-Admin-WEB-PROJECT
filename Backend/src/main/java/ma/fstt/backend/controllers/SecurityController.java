package ma.fstt.backend.controllers;

import ma.fstt.backend.dto.AuditRequest;
import ma.fstt.backend.dto.TDERequest;

import ma.fstt.backend.dto.VPDRequest;
import ma.fstt.backend.service.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/security")
public class SecurityController {

    @Autowired
    private SecurityService securityService;

    @PostMapping("/enable-tde")
    public ResponseEntity<String> enableTDE(@RequestBody TDERequest request) {
        securityService.enableTDE(request.tableName(), request.columnName());
        return ResponseEntity.ok("Chiffrement TDE activé");
    }

    @PostMapping("/enable-audit")
    public ResponseEntity<String> enableAudit(@RequestBody AuditRequest request) {
        securityService.enableAudit(request.getAction());
        return ResponseEntity.ok("Audit activé");
    }
    @PostMapping("/create-policy")
    public ResponseEntity<String> createPolicy(@RequestBody VPDRequest request) {
        securityService.createPolicy(request.getFonction(), request.getNomTable(), request.getFonctionName(), request.getPolicyName());
        return ResponseEntity.ok("Politique VPD créée");
    }
}


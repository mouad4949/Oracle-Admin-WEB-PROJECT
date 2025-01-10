//RmanController.java
package ma.fstt.backend.controllers;

import ma.fstt.backend.service.RmanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class RmanController {

    private final RmanService rmanService;

    @Autowired
    public RmanController(RmanService rmanService) {
        this.rmanService = rmanService;
    }


    @GetMapping("/rman/fullBackup")
    public String backup() {
        return rmanService.full_backup();
    }

    @GetMapping("/rman/restore_recover")
    public String restore_recover() {
        return rmanService.restore_recover();
    }

    @GetMapping("/rman/incrementalBackup")
    public String incrementalBackup() {
        return rmanService.incremental_backup();
    }

    @GetMapping("/rman/restoreByDate")
    public String restoreByDate(@RequestParam String date) {
        return rmanService.restore_backup_date(date);
    }


    @GetMapping("/rman/list_Backup")
    public String listBackup(){
        return rmanService.listBackupSummary();
    }

    @GetMapping("/rman/backup-pdb")
    public String baclupPdb() {
        return rmanService.backup_pdb();
    }




}
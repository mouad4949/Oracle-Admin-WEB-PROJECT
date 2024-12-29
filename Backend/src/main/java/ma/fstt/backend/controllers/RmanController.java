//RmanController.java
package ma.fstt.backend.controllers;

import ma.fstt.backend.service.RmanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;




@RestController
public class RmanController {
    @Autowired
    RmanService rmanService;

    @GetMapping("/rman/test")
    public String test() {
        return rmanService.test();
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



}
package ma.fstt.backend.service;
import ma.fstt.backend.resourceClass.RmanExecutor;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.stereotype.Service;


import java.text.SimpleDateFormat;
import java.util.Date;


@Service
public class RmanService {
    @Value("${project.env.rman.docker-container}")
    private  String dockerContainer ;

    @Value("${project.env.rman.is-docker}")
    private  Boolean isDocker ;

    public String test(){
        return "docker container "+dockerContainer+" is docker "+isDocker;
    }

    public String full_backup(){
        String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String command = "RUN {\n" +
                " ALLOCATE CHANNEL ch1 DEVICE TYPE DISK;\n" +
                " BACKUP SPFILE TAG='SPFILE_" + timestamp + "';\n" +
                " BACKUP CURRENT CONTROLFILE TAG='CTRL_" + timestamp + "';\n" +
                " BACKUP DATABASE PLUS ARCHIVELOG DELETE INPUT TAG='FULL_" + timestamp + "';\n" +
                " RELEASE CHANNEL ch1;\n" +
                "}";

        return     RmanExecutor.executeRmanScript(command,dockerContainer,isDocker);
    }

    public String incremental_backup() {
        String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String command = "RUN {\n" +
                " ALLOCATE CHANNEL ch1 DEVICE TYPE DISK;\n" +
                " BACKUP INCREMENTAL LEVEL 1 DATABASE TAG='INCR_" + timestamp + "';\n" +
                " BACKUP ARCHIVELOG ALL TAG='ARCHIVELOG_" + timestamp + "';\n" +
                " RELEASE CHANNEL ch1;\n" +
                "}";

        return RmanExecutor.executeRmanScript(command, dockerContainer, isDocker);
    }

    public String restore_recover(){

        String command = "RUN {\n" +
       " # First shut down the database\n" +
       " SHUTDOWN IMMEDIATE;\n" +
       " \n" +
       " # Start the database in mount mode for recovery\n" +
       " STARTUP MOUNT;\n" +
       " \n" +
       " # Set all datafiles offline to ensure clean recovery\n" +
       " # SQL \"ALTER DATABASE DATAFILE ALL OFFLINE\";\n" +
       " \n" +
       " # Restore the entire database\n" +
       " RESTORE DATABASE;\n" +
       " \n" +
       " # Bring datafiles back online\n" +
       " # SQL \"ALTER DATABASE DATAFILE ALL ONLINE\";\n" +
       " \n" +
       " # Perform complete recovery\n" +
       " RECOVER DATABASE;\n" +
       " \n" +
       " # Open the database for normal operation\n" +
       " SQL \"ALTER DATABASE OPEN\";\n" +
       " \n" +
       " # Optional: Reset logs if needed after recovery\n" +
       " # SQL \"ALTER DATABASE OPEN RESETLOGS\";\n" +
   "}";
        return     RmanExecutor.executeRmanScript(command,dockerContainer,isDocker);
    }


    // 2024-12-29 20:24:30 time format
    public String restore_backup_date(String date) {
        String command = "RUN {\n" +
                " SHUTDOWN IMMEDIATE;\n" + // Ensure the database is properly shut down
                " STARTUP MOUNT;\n" + // Mount the database for restore
                " SET UNTIL TIME \"TO_DATE('" + date + "', 'YYYY-MM-DD HH24:MI:SS')\";\n" +
                " ALLOCATE CHANNEL ch1 DEVICE TYPE DISK;\n" +
                " RESTORE DATABASE;\n" +
                " RECOVER DATABASE;\n" +
                " RELEASE CHANNEL ch1;\n" +
                " ALTER DATABASE OPEN RESETLOGS;\n" + // Open the database with resetlogs after recovery
                "}";

        return RmanExecutor.executeRmanScript(command, dockerContainer, isDocker);
    }
}
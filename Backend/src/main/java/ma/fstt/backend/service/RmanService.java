package ma.fstt.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.ScheduledFuture;

@Service
public class RmanService {

    private static final String DOCKER_PATH = "/usr/bin/docker";
    private static final String DOCKER_CONTAINER = "oracle_db1"; // Replace with your container name
    private static final String ORACLE_SID = "ORCLCDB"; // Replace with your actual SID




    private String executeRmanCommand(String rmanCommands) {
        try {
            ProcessBuilder pb = new ProcessBuilder(
                    DOCKER_PATH,
                    "exec",
                    "-i",
                    DOCKER_CONTAINER,
                    "/bin/bash",
                    "-c",
                    "export ORACLE_SID=" + ORACLE_SID + " && echo \"" + rmanCommands + "\" | rman target /"
            );

            pb.redirectErrorStream(true);
            Process process = pb.start();

            StringBuilder output = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    output.append(line).append("\n");
                }
            }

            int exitCode = process.waitFor();
            if (exitCode == 0) {
                return "RMAN Command Successful:\n" + output.toString();
            } else {
                return "RMAN Command Failed with Exit Code " + exitCode + ":\n" + output.toString();
            }
        } catch (Exception e) {
            return "Error executing RMAN command: " + e.getMessage();
        }
    }

    public String full_backup() {
        String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String command = "RUN {\n" +
                " ALLOCATE CHANNEL ch1 DEVICE TYPE DISK;\n" +
                " BACKUP SPFILE TAG='SPFILE_" + timestamp + "';\n" +
                " BACKUP CURRENT CONTROLFILE TAG='CTRL_" + timestamp + "';\n" +
                " BACKUP DATABASE PLUS ARCHIVELOG DELETE INPUT TAG='FULL_" + timestamp + "';\n" +
                " RELEASE CHANNEL ch1;\n" +
                "}";
        return executeRmanCommand(command);
    }

    public String incremental_backup() {
        String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String command = "RUN {\n" +
                " ALLOCATE CHANNEL ch1 DEVICE TYPE DISK;\n" +
                " BACKUP INCREMENTAL LEVEL 1 DATABASE TAG='INCR_" + timestamp + "';\n" +
                " BACKUP ARCHIVELOG ALL TAG='ARCHIVELOG_" + timestamp + "';\n" +
                " RELEASE CHANNEL ch1;\n" +
                "}";
        return executeRmanCommand(command);
    }

    public String restore_recover() {
        String command = "RUN {\n" +
                " SHUTDOWN IMMEDIATE;\n" +
                " STARTUP MOUNT;\n" +
                " RESTORE DATABASE;\n" +
                " RECOVER DATABASE;\n" +
                " ALTER DATABASE OPEN;\n" +
                "}";
        return executeRmanCommand(command);
    }

    public String restore_backup_date(String date) {
        String command = "RUN {\n" +
                " SHUTDOWN IMMEDIATE;\n" +
                " STARTUP MOUNT;\n" +
                " SET UNTIL TIME \"TO_DATE('" + date + "', 'YYYY-MM-DD HH24:MI:SS')\";\n" +
                " ALLOCATE CHANNEL ch1 DEVICE TYPE DISK;\n" +
                " RESTORE DATABASE;\n" +
                " RECOVER DATABASE;\n" +
                " RELEASE CHANNEL ch1;\n" +
                " ALTER DATABASE OPEN RESETLOGS;\n" +
                "}";
        return executeRmanCommand(command);
    }

    public String backup_pdb() {
        String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String command = "RUN {\n" +
                " ALLOCATE CHANNEL ch1 DEVICE TYPE DISK;\n" +
                " BACKUP PLUGGABLE DATABASE orclpdb1 TAG='PDB_" + timestamp + "';\n" +
                " RELEASE CHANNEL ch1;\n" +
                "}";
        return executeRmanCommand(command);
    }

    public String listBackupSummary() {
        String command = "LIST BACKUP SUMMARY;";
        String rmanOutput = executeRmanCommand(command);

        try {
            JSONArray backups = new JSONArray();

            // Split the output into lines
            String[] lines = rmanOutput.split("\n");
            boolean parsing = false;

            for (String line : lines) {
                // Detect the header and start parsing subsequent lines
                if (line.trim().startsWith("Key") && line.contains("Device Type")) {
                    parsing = true; // Start parsing after detecting the header
                    continue;
                }

                if (parsing) {
                    // Ignore empty lines
                    if (line.trim().isEmpty()) {
                        continue;
                    }

                    // Split the line into fields while ensuring alignment
                    String[] fields = line.trim().split("\\s{2,}"); // Split by 2 or more spaces
                    if (fields.length >= 9) {
                        JSONObject backup = new JSONObject();
                        backup.put("Key", fields[0]);
                        backup.put("Type", fields[1]);
                        backup.put("Level", fields[2]);
                        backup.put("Status", fields[3]);
                        backup.put("DeviceType", fields[4]);
                        backup.put("CompletionTime", fields[5]); // Only the date
                        backup.put("Pieces", fields[6]);
                        backup.put("Copies", fields[7]);
                        backup.put("Compressed", fields[8]);

                        // Check if Tag exists, otherwise default to an empty string
                        String tag = fields.length > 9 ? fields[9] : "";
                        backup.put("Tag", tag);

                        backups.put(backup);
                    } else {
                        // Log a warning or handle incomplete lines
                        System.out.println("Incomplete line detected: " + line);
                    }
                }
            }

            // Wrap the result in a JSON object
            JSONObject result = new JSONObject();
            result.put("Backups", backups);

            return result.toString(4); // Pretty-print JSON
        } catch (Exception e) {
            return "Error parsing RMAN output: " + e.getMessage();
        }
    }



}

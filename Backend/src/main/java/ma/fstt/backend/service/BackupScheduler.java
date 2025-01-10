package ma.fstt.backend.service;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.concurrent.ScheduledFuture;

@Service
public class BackupScheduler {
    private final RmanService rmanService;
    private final ThreadPoolTaskScheduler taskScheduler;
    private ScheduledFuture<?> fullBackupTaskFuture;
    private ScheduledFuture<?> incrementalBackupTaskFuture;

    @Value("${project.scheduled.backup.cron:0 0 2 * * ?}")
    private String fullBackupCron;

    @Value("${project.scheduled.incremental.backup.cron:0 0 6 * * ?}")
    private String incrementalBackupCron;


    @Autowired
    public BackupScheduler(RmanService rmanService, ThreadPoolTaskScheduler taskScheduler) {
        this.rmanService = rmanService;
        this.taskScheduler = taskScheduler;
    }


    @PostConstruct
    public void initializeScheduledTasks() {
        scheduleFullBackup(fullBackupCron);
        scheduleIncrementalBackup(incrementalBackupCron);
    }

    public void scheduleFullBackup(String cronExpression) {
        if (fullBackupTaskFuture != null) {
            fullBackupTaskFuture.cancel(false);
        }
        fullBackupTaskFuture = scheduleTask(() -> rmanService.full_backup(), cronExpression);
    }

    public void scheduleIncrementalBackup(String cronExpression) {
        if (incrementalBackupTaskFuture != null) {
            incrementalBackupTaskFuture.cancel(false);
        }
        incrementalBackupTaskFuture = scheduleTask(() -> rmanService.incremental_backup(), cronExpression);
    }

    private ScheduledFuture<?> scheduleTask(Runnable task, String cronExpression) {
        if (!StringUtils.hasText(cronExpression)) {
            throw new IllegalArgumentException("Cron expression must not be null or empty");
        }
        try {
            return taskScheduler.schedule(task, new CronTrigger(cronExpression));
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid cron expression: " + cronExpression, e);
        }
    }


    @PreDestroy
    public void onShutdown() {
        if (fullBackupTaskFuture != null){
            fullBackupTaskFuture.cancel(true);
        }
        if (incrementalBackupTaskFuture != null){
            incrementalBackupTaskFuture.cancel(true);
        }
        System.out.println("Scheduled tasks have been canceled.");
    }
}

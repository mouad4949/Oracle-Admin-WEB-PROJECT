# Oracle Database Administration Web Application
![WhatsApp Image 2025-01-10 at 19 52 33_fa53c278](https://github.com/user-attachments/assets/21c05a7f-9394-4768-ab8d-3e3d0b9621c8)


## Description
This project is a web-based Oracle database administration tool built with Spring Boot (backend) and React (frontend). It simulates key Oracle administration functionalities, providing an intuitive interface for database management tasks such as user management, backups/restorations, security configurations, performance monitoring, and high availability.

## Objectives
Develop a SPRING BOOT & REACT  web application capable of performing essential Oracle database administration operations:
- User management
- Backups and restorations
- Data security
- Performance monitoring
- High availability configuration

## Functional Modules

### 1. User Management
- Create, modify, and delete Oracle users.
- Manage roles and access privileges via a web interface.
- Handle space quotas and password policies.

### 2. Backup and Restoration
- Trigger full and incremental backups using RMAN.
- Display backup history and provide restoration options by date.
- Configure automated backups with customizable scheduling.

### 3. Data Security
- Configure encryption policies (TDE) and enable security audits through the interface.
- Manage Virtual Private Database (VPD) to restrict data access.

### 4. Performance Monitoring
- Display AWR and ASH reports using visualization libraries like Chart.js.
- Real-time dashboard for resource usage statistics (CPU, I/O, memory).

### 5. Performance Optimization
- Interface to review and optimize slow queries with SQL Tuning Advisor.
- Schedule table and index statistics recalculation.

### 6. High Availability
- Configure and monitor Oracle Data Guard through the interface.
- Simulate failover and switchover operations with availability reports.

## Tech Stack
- **Backend:** Spring Boot, Spring Security, JWT, JdbcTemplate
- **Frontend:** React, Chart.js
- **Database:** Oracle Database (VPD, TDE, RMAN)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/mouad4949/Oracle-Admin-WEB-PROJECT.git
   ```
2. Navigate to the backend and frontend directories and install dependencies.
3. Configure Oracle database connection settings in the backend.
4. Run the Spring Boot application and start the React frontend.



## Authors
- AYOUB AIT SAID 
- SABIR ACHRAF 
- MOHAMMED MOUAD RGUIBI




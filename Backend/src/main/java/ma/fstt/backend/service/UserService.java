package ma.fstt.backend.service;

import ch.qos.logback.classic.encoder.JsonEncoder;
import jakarta.transaction.Transactional;
import ma.fstt.backend.dto.UserAdminUpdateDTO;
import ma.fstt.backend.entities.OrclRoles;
import ma.fstt.backend.entities.OrclUsers;
import ma.fstt.backend.entities.RoleEnum;
import ma.fstt.backend.exception.ResourceNotFoundException;
import ma.fstt.backend.repository.OrclRolesRepository;
import ma.fstt.backend.repository.OrclUsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    private OrclUsersRepository usersOrclRepository;
    @Autowired
    private OrclRolesRepository rolesOrclRepository;

    @Transactional
    public void createUser(String username, String password) {
        // 1. Requête SQL CREATE USER dans Oracle
        String sql = "CREATE USER " + username + " IDENTIFIED BY " + password;
        String grantRoleSQL = "GRANT CONNECT TO " + username;
        jdbcTemplate.execute(sql);
        jdbcTemplate.execute(grantRoleSQL);

        // 2. Accorder des privilèges de connexion à l'utilisateur (optionnel)
//        String grantSql = "GRANT CONNECT TO " + username;
//        jdbcTemplate.execute(grantSql);
        // 3. Créer l'entité UsersOrcl et l'enregistrer
        OrclUsers user = new OrclUsers();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setDateCreation(new Date());
         usersOrclRepository.save(user);
    }

    @Transactional
    public OrclUsers updateUser( UserAdminUpdateDTO updateDTO) {
        OrclUsers user = usersOrclRepository.findById(updateDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur introuvable."));

        // 2. Mise à jour du mot de passe (si fourni)
        if (updateDTO.getNewPassword() != null && !updateDTO.getNewPassword().isEmpty()) {
            updatePassword(user, updateDTO.getNewPassword());
        }

        // 3. Modification du quota de tablespace (si fourni)
        if (updateDTO.getNewTablespaceQuota() != null && !updateDTO.getNewTablespaceQuota().isEmpty()) {
            updateTablespaceQuota(user, updateDTO.getNewTablespaceQuota());
        }

        // 5. Verrouillage ou déverrouillage de l'utilisateur (si fourni)
        if(updateDTO.getAccountLocked() != null){
            lockUnlockUser(user,updateDTO.getAccountLocked());
        }
        // 6. Modification du tablespace par défaut (si fourni)
        if(updateDTO.getDefaultTablespaceName() != null && !updateDTO.getDefaultTablespaceName().isEmpty()){
            updateDefaultTablespace(user,updateDTO.getDefaultTablespaceName());
        }
        // 8. Accorder ou révoquer des privilèges (si fournis)
        if(updateDTO.getPrivilegesToGrant() != null && !updateDTO.getPrivilegesToGrant().isEmpty()){
            grantPrivileges(user,updateDTO.getPrivilegesToGrant());
        }

        if(updateDTO.getPrivilegesToRevoke() != null && !updateDTO.getPrivilegesToRevoke().isEmpty()){
            revokePrivileges(user,updateDTO.getPrivilegesToRevoke());
        }
        // 9. Suppression ou désactivation de l'utilisateur (si demandé)
        if (updateDTO.isDeleteUser()) {
            deleteUser(user.getUsername());
        } else if (updateDTO.isDisableUser()) {
            disableUser(user);
        }

        usersOrclRepository.save(user);
        return user;
    }




    private void updatePassword(OrclUsers user, String newPassword) {
//        String hashedPassword = passwordEncoder.encode(newPassword);
        String sql = "ALTER USER " + user.getUsername() + " IDENTIFIED BY "+ newPassword;
        jdbcTemplate.update(sql);
        user.setPassword(newPassword);
    }

    private void updateTablespaceQuota(OrclUsers user, String newTablespaceQuota) {
        String sql = "ALTER USER " + user.getUsername() + " QUOTA " + newTablespaceQuota + " ON USERS";
        jdbcTemplate.execute(sql);
        user.setNewTablespaceQuota(newTablespaceQuota);
    }

    private void lockUnlockUser(OrclUsers user, boolean lock) {
        String sql = lock ? "ALTER USER " + user.getUsername() + " ACCOUNT LOCK" :
                "ALTER USER " + user.getUsername() + " ACCOUNT UNLOCK";
        jdbcTemplate.execute(sql);
    }

    private void updateDefaultTablespace(OrclUsers user, String defaultTablespaceName) {
        String sql = "ALTER USER " + user.getUsername() + " DEFAULT TABLESPACE " + defaultTablespaceName;
        jdbcTemplate.execute(sql);
        user.setDefaultTablespaceName(defaultTablespaceName);

    }

    private void updateRoles(OrclUsers user, List<String> roleNames){
        Set<OrclRoles> roles = roleNames.stream()
                .map(roleName -> RoleEnum.valueOf(roleName))
                .map(roleEnum -> rolesOrclRepository.findByName(roleEnum)
                        .orElseThrow(() -> new ResourceNotFoundException("Role " + roleEnum + " introuvable.")))
                .collect(Collectors.toSet());
        user.setRoles(roles);
    }


    private void grantPrivileges(OrclUsers user,List<String> privilegesToGrant){
        privilegesToGrant.forEach(privilege -> {
            String sql = "GRANT " + privilege + " TO " + user.getUsername();
            jdbcTemplate.execute(sql);
        });
    }
    private void revokePrivileges(OrclUsers user,List<String> privilegesToRevoke){
        privilegesToRevoke.forEach(privilege -> {
            String sql = "REVOKE " + privilege + " FROM " + user.getUsername();
            jdbcTemplate.execute(sql);
        });
    }
    public void deleteUser(String user) {
        String sql = "DROP USER " + user + " CASCADE";
        jdbcTemplate.execute(sql);
        Optional<OrclUsers> userdelet = usersOrclRepository.findOrclUsersByUsername(user);
        OrclUsers userdelete1= userdelet.get();
        usersOrclRepository.delete(userdelete1);
    }

    private void disableUser(OrclUsers user) {
        String sql = "ALTER USER " + user.getUsername() + " ACCOUNT LOCK";
        jdbcTemplate.execute(sql);
        user.setEnabled(false);
    }

    public List<OrclUsers> getAllUsers() {
        return usersOrclRepository.findAll();
    }

    @Transactional
    public void assignRolesToUser(String username, List<String> roles) {
        // Récupérer l'utilisateur
        Optional<OrclUsers> userOptional = usersOrclRepository.findOrclUsersByUsername(username);
        if (userOptional.isEmpty()) {
            throw new RuntimeException("Utilisateur non trouvé : " + username);
        }
        OrclUsers user = userOptional.get();

        // Parcourir les rôles
        for (String roleName : roles) {
            Optional<OrclRoles> roleOptional;
            try {
                // Essayer de convertir en enum OrclRole
                RoleEnum enumRole = RoleEnum.valueOf(roleName.toUpperCase());
                roleOptional = rolesOrclRepository.findByName(enumRole);
            } catch (IllegalArgumentException e) {
                // Sinon, chercher dans ROLE_NAME
                roleOptional = rolesOrclRepository.findByRoleName(roleName);
            }

            if (roleOptional.isPresent()) {
                OrclRoles role = roleOptional.get();
                user.getRoles().add(role);
            } else {
                throw new RuntimeException("Rôle non trouvé : " + roleName);
            }
        }
        // Sauvegarder les modifications
        usersOrclRepository.save(user);
    }


    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        OrclUsers user = usersOrclRepository.findOrclUsersByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name()))
                .collect(Collectors.toList());
        return new User(user.getUsername(), user.getPassword(), authorities);
    }
}

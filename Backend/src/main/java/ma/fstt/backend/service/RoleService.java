package ma.fstt.backend.service;

import ma.fstt.backend.entities.OrclPrivilege;
import ma.fstt.backend.entities.OrclRoles;
import ma.fstt.backend.entities.PrivilegeEnum;
import ma.fstt.backend.entities.RoleEnum;
import ma.fstt.backend.repository.OrclRolesRepository;
import ma.fstt.backend.repository.PrivilegeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Service
public class RoleService {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    private  OrclRolesRepository rolesOrclRepository;

    @Autowired
    private PrivilegeRepository privilegeRepository;

    public RoleService(OrclRolesRepository rolesOrclRepository) {
        this.rolesOrclRepository = rolesOrclRepository;
    }

    public void createDefaultRoles() {
        long val =rolesOrclRepository.count();
        System.out.println(val);
        // Vérifie si les rôles existent déjà
        if(rolesOrclRepository.count() > 0){
            return;
        }

        //Enregistre chaque valeur de l'enum RoleEnum
        Arrays.stream(RoleEnum.values())
                .forEach(roleEnum -> {
                    OrclRoles role = new OrclRoles();
                    role.setName(roleEnum);
                    rolesOrclRepository.save(role);
                });
    }
    public void  CreatRole(String roleName,String identifiedBy) {
        OrclRoles newRole = new OrclRoles();
        newRole.setRoleName(roleName);
        newRole.setPassword(identifiedBy);
        newRole.setName(RoleEnum.DEFAULT);
        OrclRoles savedRole= rolesOrclRepository.save(newRole);

        // 2. Construction de la requête SQL CREATE ROLE
        StringBuilder sqlBuilder = new StringBuilder("CREATE ROLE " + roleName);

        if (identifiedBy != null && !identifiedBy.isEmpty()) {
            sqlBuilder.append(" IDENTIFIED BY ").append(identifiedBy);
        }
        try {
            jdbcTemplate.execute(sqlBuilder.toString());
              // On retourne le role enregistré
        }
        catch (Exception e) {
            // Si une exception se produit pendant l'execution SQL on supprime de la table Role_orcl l'entrée qui a été rajouté.
            rolesOrclRepository.delete(savedRole);
            //Gérer l'exception SQL et la relancer
            throw new RuntimeException("Error creating role in Oracle via SQL: " + e.getMessage(), e);
        }
    }



    public List<OrclRoles> getAllRoles() {
        return rolesOrclRepository.findAll();
    }

    @Transactional
    public void grantPrivilegeToRole(String roleName, String privilegeName) {
        // Convertir le nom du privilège en enum
        PrivilegeEnum privilegeEnum;


            privilegeEnum = PrivilegeEnum.valueOf(privilegeName);
            // Convertit la chaîne en enum


        // Vérifier si le rôle existe
        OrclRoles role = rolesOrclRepository.findByRoleName(roleName)
                .orElseThrow(() -> new RuntimeException("Rôle non trouvé avec le nom : " + roleName));

        // Vérifier si le privilège existe
        OrclPrivilege privilege = privilegeRepository.findByName(privilegeEnum)
                .orElseThrow(() -> new RuntimeException("Privilège non trouvé avec le nom : " + privilegeName));
        String toprivilege=privilege.getName().toString().replace("_", " ");
        // Construire la commande SQL GRANT
        String sql = String.format("GRANT %s TO %s", toprivilege, role.getRoleName());

        // Exécuter la commande SQL GRANT
        jdbcTemplate.execute(sql);

        // Mettre à jour l'entité OrclRoles pour refléter l'ajout du privilège
        role.getPrivileges().add(privilege);
        rolesOrclRepository.save(role);
    }


    public void deleterow(Long id) {
        rolesOrclRepository.deleteById(id);
    }
}

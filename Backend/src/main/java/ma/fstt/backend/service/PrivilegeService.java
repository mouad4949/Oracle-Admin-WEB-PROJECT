package ma.fstt.backend.service;

import jakarta.annotation.PostConstruct;
import ma.fstt.backend.entities.OrclPrivilege;
import ma.fstt.backend.entities.PrivilegeEnum;
import ma.fstt.backend.repository.PrivilegeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class PrivilegeService {

    @Autowired
    private PrivilegeRepository privilegeRepository;


    @PostConstruct
    public void initPrivileges() {
        // Liste des privilèges à insérer
        List<PrivilegeEnum> privileges = Arrays.asList(
                PrivilegeEnum.CREATE_SESSION,
                PrivilegeEnum.CREATE_TABLE,
                PrivilegeEnum.ALTER_ANY_TABLE,
                PrivilegeEnum.DROP_ANY_TABLE,
                PrivilegeEnum.GRANT_ANY_PRIVILEGE,
                PrivilegeEnum.CREATE_USER,
                PrivilegeEnum.DELETE_USER,
                PrivilegeEnum.UPDATE_USER,
                PrivilegeEnum.VIEW_USER,
                PrivilegeEnum.CREATE_ROLE,
                PrivilegeEnum.DELETE_ROLE,
                PrivilegeEnum.UPDATE_ROLE,
                PrivilegeEnum.VIEW_ROLE
        );
        for (PrivilegeEnum privilegeName : privileges) {
            if (privilegeRepository.findByName(privilegeName) == null) {
                OrclPrivilege privilege = new OrclPrivilege();
                privilege.setName(privilegeName);
                privilegeRepository.save(privilege);
            }
        }
    }

    public List<OrclPrivilege> getAllPrivileges() {
        return privilegeRepository.findAll();
    }

}

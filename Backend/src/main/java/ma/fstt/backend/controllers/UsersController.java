package ma.fstt.backend.controllers;

import ma.fstt.backend.dto.GrantRoleRequest;
import ma.fstt.backend.dto.UserAdminUpdateDTO;
import ma.fstt.backend.dto.UserDto;
import ma.fstt.backend.entities.OrclPrivilege;
import ma.fstt.backend.entities.OrclRoles;
import ma.fstt.backend.entities.OrclUsers;
import ma.fstt.backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController

public class UsersController {

    @Autowired
    UserService userService;


    @Autowired
    PrivilegeService privilegeService;
    @Autowired
    AuthenticationSertvice authenticationSertvice;

    @Autowired
    RoleService roleService;

    @Autowired
    DatabaseService databaseService;


    @PostMapping("/executeSql")
    public ResponseEntity<String> executeSqlQuery(@RequestParam String sql){
        try{
            databaseService.executeSql(sql);
            return ResponseEntity.ok("SQL command: "+sql +" was executed successfully");
        }catch(DataAccessException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/executeSelectSql")
    public ResponseEntity<?> executeSelectQuery(@RequestParam String sql) {
        try {
            List<Map<String, Object>> result = databaseService.executeSelectSql(sql);
            return ResponseEntity.ok(result);
        } catch (DataAccessException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/")
    public void home(){
        System.out.println(" on pense que tout passe bien");
    }

    @PostMapping("/CreateUser")
    public void createUser(@RequestBody UserDto userDto ){
        userService.createUser(userDto.username(), userDto.password());
        System.out.println(" on pense que tout passe bien");
    }

    @PostMapping("/UpdateUser")
    public void updateUser( @RequestBody  UserAdminUpdateDTO updateDTO){
        userService.updateUser(updateDTO);
        System.out.println(" on pense que tout passe bien");
    }

    @DeleteMapping("/DeleteUser")
    public void deleteUser( @RequestParam String username){
        userService.deleteUser(username);
        System.out.println(" on pense que tout passe bien");
    }
    @PostMapping("/role/{roleName}/grant-privilege/{privilegeName}")
    public ResponseEntity<String> grantPrivilegeToRole(@PathVariable String roleName, @PathVariable String privilegeName) {
        try {
            roleService.grantPrivilegeToRole(roleName, privilegeName);
            return ResponseEntity.ok("Privilège accordé avec succès au rôle.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/Privilege")
    public List<OrclPrivilege> createprivilege(){
        return privilegeService.getAllPrivileges();
    }

    @PostMapping("/CreateRole")
    public ResponseEntity<?> createRole(@RequestBody GrantRoleRequest grantRoleRequest) {
        try {
            // Appeler le service pour créer le rôle
            roleService.CreatRole(grantRoleRequest.getRoleName(), grantRoleRequest.getPassword());

            // Retourner une réponse HTTP 200 avec un message de succès
            return ResponseEntity.ok().body("Rôle créé avec succès.");
        } catch (Exception e) {
            // Retourner une réponse HTTP 400 avec le message d'erreur
            return ResponseEntity.badRequest().body("Erreur lors de la création du rôle : " + e.getMessage());
        }
    }

    @PostMapping("/GrantRole")
    public void grantRoleToUser(@RequestBody GrantRoleRequest request ){
        userService.assignRolesToUser(request.getUsername(),request.getRoleNames());
        System.out.println(" on pense que tout passe bien");
    }

    @GetMapping("/Roles")
    public List<OrclRoles> getRoles(){
       return roleService.getAllRoles();
    }

    @GetMapping("/allUsers")
    public List<OrclUsers> getAllusers(){
        return userService.getAllUsers();
    }

    @PostMapping("/login")
    public Map<String, String> login (@RequestBody UserDto userDto) throws Exception {
     String token=   authenticationSertvice.authenticateAndGenerateToken(userDto.username(),userDto.password());
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        return response;
    }

    @PostMapping("/deleteRole")
    public void deleteRow(@RequestBody Long id){
    roleService.deleterow(id);
    }

    @GetMapping("/users")
    public List<OrclUsers> getallusers(){
        List<OrclUsers> users = userService.getAllUsers();
        return users;
    }
}


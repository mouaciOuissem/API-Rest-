package com.quest.etna.model;

import javax.persistence.*;
import org.hibernate.type.EnumType;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "user_details")
public class UserDetails {

	public UserDetails(String username, UserRole role) {
	       this.username = username;
	       this.role = role;
	}

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   @Column(name = "id")
   private Integer id;

   @Column(name = "username", nullable = false, length = 255)
   private String username;

   @Enumerated
   @Column(name = "role", nullable = false, length = 255)
   private UserRole role = UserRole.ROLE_USER;

   @OneToOne(fetch = FetchType.LAZY)
   @JoinColumn(name = "id", referencedColumnName = "id")
   private User user;
   
   private boolean isAdmin;
    public Integer setId(Integer id) {
    	return id;
    }

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    @JsonIgnore
    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
    }
    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }
    @Override
    public String toString() {
        return "UserDetails{" +
                "username='" + username + '\'' +
                ", role=" + role +
                '}';
    }


    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((username == null) ? 0 : username.hashCode());
        result = prime * result + ((role == null) ? 0 : role.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        UserDetails other = (UserDetails) obj;
        if (role != other.role)
            return false;
        if (username == null) {
            if (other.username != null)
                return false;
        } else if (!username.equals(other.username))
            return false;
        return true;
    }
}

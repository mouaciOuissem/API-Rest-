package com.quest.etna.model;
import java.util.Date;

import javax.persistence.*;


@Entity 
@Table(name ="address")
public class Address {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name ="id")
	private Integer id;
	
	@Column(nullable = false, length = 100)
	private String street;
	
	
	@Column(nullable = false, length = 30)
	private String postalCode;
	
	@Column(nullable = false, length = 50)
	private String city;
	
	@Column(nullable = false, length = 50)
	private String country;
	
	//jointure avec la table user
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)    
    private User user;
	
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = true )
    private Date creationDate = new Date();

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = true)
    private Date updatedDate = new Date();
    
    @Column(nullable = false)
    private boolean isDefault;
    
    //-------------getters-------------
    
    public Integer getId() {
        return id;
    }
    public String getStreet() {
        return street;
    }
    public String getCountry() {
        return country;
    }
    public String getCity() {
        return city;
    }
    public String getPostalCode() {
        return postalCode;
    }
    public User getUser() {
    	return user;
    }
    public Date getCreationDate() {
        return creationDate;
    }

    public Date getUpdatedDate() {
        return updatedDate;
    }
    
    public Boolean getIsDefault() {
        return isDefault;
    }
    
    //-------------setters-----------
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public void setStreet(String street) {
        this.street = street;
    }
    
    public void setCountry(String country) {
        this.country = country;
    }
    public void setCity(String city) {
        this.city = city;
    }
    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }
    public void setUser(User user) {
        this.user = user;
    }
    
    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }
    public void setUpdatedDate(Date updatedDate) {
        this.updatedDate = updatedDate;
    }
    public void setIsDefault(Boolean isDefault) {
        this.isDefault = isDefault;
    }
}

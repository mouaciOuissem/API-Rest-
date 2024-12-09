package com.quest.etna.model;

import javax.persistence.*;

@Entity
@Table(name = "product")
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @Column(nullable = false)
  private String name;
  
  @Column(nullable = false)
  private String category;
  
  @Column(nullable = true)
  private String description;

  @Column(nullable = false)
  private double price;
  
  @Column(nullable = true)
  private String image;
  //getters 
  public int getId() {
      return id;
  }
  
  @Column(nullable = false)
  private int stock;
  
  public String getName() {
      return name;
  }
  
  public String getCategory() {
      return category;
  }
  public String getDescription() {
      return description;
  }
  public String getImage() {
      return image;
  }
  public double getPrice() {
      return price;
  }
  public int getStock() {
      return stock;
  }
  
  public void setId(Integer id) {
      this.id = id;
  }
  public void setName(String name) {
      this.name = name;
  }
  public void setPrice(double price) {
      this.price = price;
  }
  public void setDescription(String description) {
      this.description=description;
  }
  public void setCategory(String category) {
      this.category=category;
  }
  public void setImage(String image) {
      this.image=image;
  }
  public void setStock(Integer stock) {
      this.stock = stock;
  }
}


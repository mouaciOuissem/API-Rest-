package com.quest.etna;

import java.sql.Connection;
import java.sql.DriverManager;

public class DatabaseConnectionTest {
    public static void main(String[] args) {
        String jdbcUrl = "jdbc:mysql://localhost:3306/quest_web";
        String username = "application";
        String password = "password";

        try {
            Connection conn = DriverManager.getConnection(jdbcUrl, username, password);
            System.out.println("Connection successful");
            conn.close();
        } catch (Exception e) {
            System.out.println("Connection failed: " + e.getMessage());
        }
    }
}
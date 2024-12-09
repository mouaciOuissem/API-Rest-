package com.quest.etna.model;

public enum UserRole {
    ROLE_USER("User"),
    ROLE_ADMIN("Admin");

    private String displayName;

    UserRole(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}

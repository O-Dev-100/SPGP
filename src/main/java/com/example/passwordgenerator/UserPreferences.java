package com.example.passwordgenerator;

import java.util.prefs.Preferences;

public class UserPreferences {
    private Preferences prefs = Preferences.userNodeForPackage(UserPreferences.class);

    public void savePreference(String key, String value) {
        prefs.put(key, value);
    }

    public String getPreference(String key, String defaultValue) {
        return prefs.get(key, defaultValue);
    }}

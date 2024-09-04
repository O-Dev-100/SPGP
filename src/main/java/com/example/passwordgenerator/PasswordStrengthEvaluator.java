package com.example.passwordgenerator;

public class PasswordStrengthEvaluator {
    public int evaluate(String password) {
        int strength = 0;
        if (password.length() >= 12) strength++;
        if (password.matches(".*[A-Z].*")) strength++;
        if (password.matches(".*[a-z].*")) strength++;
        if (password.matches(".*\\d.*")) strength++;
        if (password.matches(".*[!@#$%^&*()-_=+\\[\\]{};':\"\\\\|,.<>/?].*")) strength++;
        return strength;
    }

    public String getStrengthLabel(int strength) {
        switch (strength) {
            case 1: return "Very Weak";
            case 2: return "Weak";
            case 3: return "Medium";
            case 4: return "Strong";
            case 5: return "Very Strong";
            default: return "Unknown";
        }}}

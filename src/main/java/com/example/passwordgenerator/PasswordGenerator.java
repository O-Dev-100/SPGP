package com.example.passwordgenerator;

import java.util.Random;

public class PasswordGenerator {
    private static final String UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
    private static final String DIGIT_CHARS = "0123456789";
    private static final String SPECIAL_CHARS = "!@#$%^&*()-_=+[]{};':\"\\|,.<>/?";

    private Random random = new Random();

    public String generate(int minLength, int maxLength, boolean[] includeCharSets, 
                            boolean excludeAmbiguous, boolean excludeSequential, String customChars) {
        StringBuilder charSetBuilder = new StringBuilder(customChars);

        if (includeCharSets[0]) charSetBuilder.append(UPPERCASE_CHARS);
        if (includeCharSets[1]) charSetBuilder.append(LOWERCASE_CHARS);
        if (includeCharSets[2]) charSetBuilder.append(DIGIT_CHARS);
        if (includeCharSets[3]) charSetBuilder.append(SPECIAL_CHARS);

        String charSet = excludeAmbiguous ? removeAmbiguousChars(charSetBuilder.toString()) : charSetBuilder.toString();

        StringBuilder passwordBuilder = new StringBuilder();
        for (int i = 0; i < maxLength; i++) {
            passwordBuilder.append(charSet.charAt(random.nextInt(charSet.length())));
        }

        if (excludeSequential) {
            passwordBuilder = new StringBuilder(shuffle(passwordBuilder.toString()));
        }

        return passwordBuilder.toString();
    }

    private String removeAmbiguousChars(String charSet) {
        return charSet.replaceAll("[0O1lI]", ""); }

    private String shuffle(String input) {
        char[] characters = input.toCharArray();
        for (int i = characters.length - 1; i > 0; i--) {
            int j = random.nextInt(i + 1);
            char temp = characters[i];
            characters[i] = characters[j];
            characters[j] = temp;
        }
        return new String(characters); }}

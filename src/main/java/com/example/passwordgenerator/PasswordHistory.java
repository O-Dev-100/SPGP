package com.example.passwordgenerator;

import java.util.LinkedList;

public class PasswordHistory {
    private LinkedList<String> history = new LinkedList<>();

    public void add(String password) {
        history.addFirst(password);
        if (history.size() > 10) {
            history.removeLast();
        }}

    public LinkedList<String> getHistory() {
        return history;}}

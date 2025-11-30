package com.example.backend;

public class Scholarship {
    private String id;
    private String name;
    private String status;
    private String amount;
    private String deadline;
    private String major;
    private String gpa;
    private String year;

    public Scholarship() {}

    public Scholarship(String id, String name, String status, String amount, String deadline, String major, String gpa, String year) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.amount = amount;
        this.deadline = deadline;
        this.major = major;
        this.gpa = gpa;
        this.year = year;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getAmount() { return amount; }
    public void setAmount(String amount) { this.amount = amount; }

    public String getDeadline() { return deadline; }
    public void setDeadline(String deadline) { this.deadline = deadline; }

    public String getMajor() { return major; }
    public void setMajor(String major) { this.major = major; }

    public String getGpa() { return gpa; }
    public void setGpa(String gpa) { this.gpa = gpa; }

    public String getYear() { return year; }
    public void setYear(String year) { this.year = year; }
}

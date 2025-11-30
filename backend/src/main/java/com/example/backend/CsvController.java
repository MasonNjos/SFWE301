package com.example.backend;

import com.opencsv.CSVReader;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.*;

import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // simple CORS for dev
public class CsvController {

    @GetMapping("/students")
    public List<Student> getStudents() throws Exception {
        ClassPathResource resource = new ClassPathResource("data/students.csv"); // put CSV under src/main/resources/data/students.csv
        try (CSVReader reader = new CSVReader(new InputStreamReader(resource.getInputStream()))) {
            List<Student> out = new ArrayList<>();
            String[] row;
            boolean header = true;
            while ((row = reader.readNext()) != null) {
                if (header) { header = false; continue; } // skip header
                // defensive: ensure row length
                String fn = row.length>0?row[0]:"";
                String ln = row.length>1?row[1]:"";
                String major = row.length>2?row[2]:"";
                String gpa = row.length>3?row[3]:"";
                String year = row.length>4?row[4]:"";
                String score = row.length>4?row[5]:"";
                out.add(new Student(fn, ln, major, gpa, year, score));
            }
            return out;
        }
    }

    @GetMapping("/scholarships")
    public List<Scholarship> getScholarships() throws Exception {
        ClassPathResource resource = new ClassPathResource("data/scholarships.csv");
        try (CSVReader reader = new CSVReader(new InputStreamReader(resource.getInputStream()))) {
            List<Scholarship> out = new ArrayList<>();
            String[] row;
            boolean header = true;
            while ((row = reader.readNext()) != null) {
                if (header) { header = false; continue; }
                String id = row.length>0?row[0]:"";
                String name = row.length>1?row[1]:"";
                String status = row.length>2?row[2]:"";
                String amount = row.length>3?row[3]:"";
                String deadline = row.length>4?row[4]:"";
                String major = row.length>5?row[5]:"";
                String gpa = row.length>6?row[6]:"";
                String year = row.length>7?row[7]:"";
                String ps = row.length>8?row[8]:"";
                out.add(new Scholarship(id, name, status, amount, deadline, major, gpa, year, ps));
            }
            return out;
        }
    }
}
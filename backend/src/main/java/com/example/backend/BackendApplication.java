package com.example.backend;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


//@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		// SpringApplication.run(BackendApplication.class, args);
		// make a list to store students
		List<Student> students = new ArrayList<>();
		List<Scholarship> scholarships = new ArrayList<>();

		// read in student csv
		try (BufferedReader reader = Files.newBufferedReader(Paths.get("student.csv"))) {
			String headerLine = reader.readLine();
			if (headerLine != null) {
				String[] headers = headerLine.split(",");
				Map<String, Integer> headerIndex = new HashMap<>();
				for (int i = 0; i < headers.length; i++) {
					headerIndex.put(headers[i].trim(), i);
				}

				String line;
				while ((line = reader.readLine()) != null) {
					String[] fields = line.split(",", -1);
					String fName = headerIndex.containsKey("First Name") ? fields[headerIndex.get("First Name")].trim() : "";
					String lName = headerIndex.containsKey("Last Name") ? fields[headerIndex.get("Last Name")].trim() : "";
					String gpa = headerIndex.containsKey("GPA") ? fields[headerIndex.get("GPA")].trim() : "";
					String major = headerIndex.containsKey("Major") ? fields[headerIndex.get("Major")].trim() : "";
					String schoolYear = headerIndex.containsKey("Year") ? fields[headerIndex.get("Year")].trim() : "";
					String score = headerIndex.containsKey("Score") ? fields[headerIndex.get("Score")].trim() : "";

					// Process the data as needed
					// store data in a list of Student objects
					Student student = new Student(fName, lName, major, gpa, schoolYear, score);
					students.add(student);

				}
			}
		} catch (IOException e) {
			System.out.println("Can't read file: " + e.getMessage());
		}

		// test reading file by outputting each line
		// DELETE LATER JUST FOR DEBUGGING
				for (Student currStudent : students) {
					System.out.println("Student: " + currStudent.getFirstName() + " " + currStudent.getLastName() +
							", Major: " + currStudent.getMajor() +
							", GPA: " + currStudent.getGpa() +
							", Year: " + currStudent.getYear());
				}



		// read in scholarships csv		
			// onlly need gpa, major, school year
			// store scholarships in a list

		try (BufferedReader reader = Files.newBufferedReader(Paths.get("scholarships.csv"))) {
			String headerLine = reader.readLine();
			if (headerLine != null) {
				String[] headers = headerLine.split(",");
				Map<String, Integer> headerIndex = new HashMap<>();
				for (int i = 0; i < headers.length; i++) {
					headerIndex.put(headers[i].trim(), i);
				}

				String line;
				while ((line = reader.readLine()) != null) {
					String[] fields = line.split(",", -1);
					String scholarshipId = headerIndex.containsKey("id") ? fields[headerIndex.get("id")].trim() : "";
					String scholarshipName = headerIndex.containsKey("name") ? fields[headerIndex.get("name")].trim() : "";
					String scholarshipStatus = headerIndex.containsKey("status") ? fields[headerIndex.get("status")].trim() : "";
					String scholarshipAmount = headerIndex.containsKey("amount") ? fields[headerIndex.get("amount")].trim() : "";
					String scholarshipDeadline = headerIndex.containsKey("deadline") ? fields[headerIndex.get("deadline")].trim() : "";
					String scholarshipMajor = headerIndex.containsKey("major") ? fields[headerIndex.get("major")].trim() : "";
					String scholarshipGpa = headerIndex.containsKey("gpa") ? fields[headerIndex.get("gpa")].trim() : "";
					String scholarshipYear = headerIndex.containsKey("year") ? fields[headerIndex.get("year")].trim() : "";
					String scholarshipPs = headerIndex.containsKey("ps") ? fields[headerIndex.get("ps")].trim() : "";

					// store data in a list of scholarships
					Scholarship currScholarship = new Scholarship(scholarshipId, scholarshipName, scholarshipStatus, 
					scholarshipAmount, scholarshipDeadline, scholarshipMajor, scholarshipGpa, scholarshipYear, scholarshipPs);

					scholarships.add(currScholarship);

				}
			}
		} catch (IOException e) {
			System.out.println("Can't read file: " + e.getMessage());
		}

				// test reading file by outputting each line
		// DELETE LATER JUST FOR DEBUGGING
				for (Scholarship currScholarship : scholarships) {
					System.out.println("Scholarship: " + currScholarship.getName() +
							", Major: " + currScholarship.getMajor() +
							", GPA: " + currScholarship.getGpa() +
							", Year: " + currScholarship.getYear());

				}


		// suggest scholarships
			// System shall recommend scholarships to applicants based on gpa, major, and school year
			// suggest based on score




		// automatic scoring (mentioned above)
			// give each scholarship a "score" and then sort by highest score
			// score is based on how well you match to the scholarship
			// raise score based on gpa - 1 pt for min, 2 points for every 0.5 above min or something along those lines
			// if one requirement is not met score = 0

			// student matching (based on score)
			// sort scholarships by score (high to low)

			// eligibility filtering (if score == 0) don't show 


		// match %
			// eligibleScholarships/totalScholarships * 100 %

		// add match rate to student.csv
			

		
	}

}

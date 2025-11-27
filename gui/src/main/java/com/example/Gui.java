package com.example;

import javafx.application.*;
import javafx.scene.*;
import javafx.scene.control.*;
import javafx.scene.layout.*;
import javafx.stage.*;
import javafx.geometry.*;
import javafx.scene.text.*;
import javafx.scene.control.*;
import javafx.scene.paint.*;



public class Gui extends Application {
     @Override
    public void start(Stage stage) {
        //Title of the whole thing
        stage.setTitle("Scholar Cats");

        BorderPane borderPane = new BorderPane();
      
        //Header

        HBox topBar = new HBox();
        topBar.setStyle("-fx-background-color: #001148ff;");
        topBar.setPrefHeight(100);

       
        Label header = new Label("Scholar Cats");
        header.setFont(Font.font("Arial", FontWeight.BOLD, 24));
        header.setTextFill(Color.RED);
        
        topBar.getChildren().add(header);
        topBar.setAlignment(Pos.CENTER_LEFT);
        topBar.setPadding(new Insets(10,0,0,10));
        
        borderPane.setTop(topBar);
   
        //TO-Do Need to add the profile syblom on the left 

        //also need to make the drop down menu when it comes to if it a student an advisor or a person making the scholar ship

        
        //header
        

        //To-Do

         //1.need to add extra words under it like "Find your scholarsh

        //2.need to add what scholar there actully are

        //3.the information for the different scholarship depending on what there is.

        //4. making the button works

        //5.make another page for the information of the scholar ship to be displayed

        //6.need to somehow make it full screen so it dosne't struggle with that

        //7. need to also make it a login page

        

     
        Scene scene = new Scene(borderPane, 600, 600);

        stage.setTitle("ScholarShip Tracker");
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
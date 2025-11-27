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
   
        


        
        Button button = new Button("Click me!");
        button.setOnAction(e -> System.out.println("Button clicked"));

        StackPane root = new StackPane(button);
        Scene scene = new Scene(borderPane, 600, 600);

        stage.setTitle("ScholarShip Tracker");
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
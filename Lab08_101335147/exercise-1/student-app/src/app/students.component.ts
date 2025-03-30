import { Component } from "@angular/core";

@Component({
    selector: 'students',
    template: '<h2>{{ getCurrentDate() }}</h2>',
    standalone: true
})

export class StudentsComponent{
    title = "My List of Students"
    date = new Date();
    
    
    getTitle(){
        return this.title;
    }
    getCurrentDate(){
        return this.date;
    }

}
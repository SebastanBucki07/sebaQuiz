import {Component} from '@angular/core';
import {Category} from "./categories/categories.component";
import {QuestionTypesService} from "./question-types.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'heroku-angular';
  questionType: number;
  categories: Category[] = []
  categoriesId: number[] = []

  async ngOnInit(): Promise<void> {
    this.questionType = -1
  }

  constructor(public categoryService: QuestionTypesService) {
    this.questionType = -1
  }

  confirm(){
    this.categories = this.categoryService.getCategories()
    console.log(`this categories: ${JSON.stringify(this.categories)}`)
    this.categories.forEach((category)=>{
      console.log(`categoryid: ${category.id}`)
      this.categoriesId.push(category.id)
    })
  }

  setQuestionType(question: number) {
    if (question === 50){
      const tmp = Math.floor(Math.random() * this.categories.length)
      this.questionType = this.categories[tmp].id
    }else{
      this.questionType = question
    }
  }
}


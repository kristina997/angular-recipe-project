import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
//import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()

export class RecipeService {
   //recipeSelected = new Subject<Recipe>();
   recipeChanged = new Subject<Recipe[]>();

   private recipes: Recipe[] = [
        new Recipe('Tasty pancakes', 
        'How do you get these perfect pancakes..', 
        'https://www.inspiredtaste.net/wp-content/uploads/2022/11/Fluffy-Pancakes-Recipe-Video.jpg',
        [
            new Ingredient('Eggs', 3),
            new Ingredient('Milk', 1),
            new Ingredient('Vanilla extract', 1),
            new Ingredient('White sugar', 1),
            new Ingredient('Baking powder', 1),
            new Ingredient('Baking soda', 1),
            new Ingredient('Butter', 1)
        ] ),
        new Recipe('Brownies',
         'This is a simple, powerful sweet', 
        'https://glossy.espreso.co.rs/data/images/2016/12/02/14/143924_shutterstock-275513057_ff.jpg?ver=1480686553',
        [
            new Ingredient('Eggs', 4),
            new Ingredient('Cocoa Powder', 1),
            new Ingredient('Vanilla extract', 1),
            new Ingredient('Sugar', 1),
            new Ingredient('Butter', 1),
            new Ingredient('Chocolate', 1)
        ] )
      ];

    constructor(private slService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    addIngredientsToSL(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }
}
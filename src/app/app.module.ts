import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { FormsModule } from '@angular/forms'
import { HomeComponent } from './home/home.component'
import { NavigationComponent } from './navigation/navigation.component'
import { NavMenuComponent } from './nav-menu/nav-menu.component'
import { ContentComponent } from './content/content.component'
import { PetsComponent } from './pets/pets.component'
import { NewPetComponent } from './pets/new-pet/new-pet.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    NavMenuComponent,
    ContentComponent,
    PetsComponent,
    NewPetComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

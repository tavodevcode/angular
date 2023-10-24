import { Component, Input, OnChanges } from '@angular/core'
import { PetsService } from '../pets.service'
import { Drawer, initFlowbite } from 'flowbite'

import { FormBuilder, Validators } from '@angular/forms'
import { ValidateForms } from 'src/models/validate-forms'
import { Pet } from 'src/interfaces/pets'
// import { Pet } from 'src/interfaces/pets'

@Component({
  selector: 'app-new-pet',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.css']
})
export class NewPetComponent extends ValidateForms implements OnChanges {
  @Input() getPets!: () => void
  @Input() isEdit = false
  @Input() pet: Pet | undefined

  private flowbiteReference = initFlowbite

  loading = false
  error = false

  productForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    type: ['', [Validators.required]],
    image_url: ['', [Validators.required]]
  })

  constructor(
    private petsService: PetsService,
    private fb: FormBuilder
  ) {
    super()

    console.log(this.flowbiteReference)
  }

  ngOnChanges() {
    if (this.pet) {
      this.productForm.patchValue({
        name: this.pet.name,
        description: this.pet.description,
        type: this.pet.type,
        image_url: this.pet.image_url
      })
    }

    if (!this.isEdit) {
      this.productForm.reset()
    }
  }

  get name() {
    return this.productForm.get('name')
  }

  get description() {
    return this.productForm.get('description')
  }

  get type() {
    return this.productForm.get('type')
  }

  get image_url() {
    return this.productForm.get('image_url')
  }

  handleSubmit(): void {
    const $targetEl = document.getElementById('pets-drawer')
    const drawer = new Drawer($targetEl as HTMLElement, { placement: 'right' })

    this.loading = true

    if (this.productForm.valid) {
      const { description, image_url, name, type } = this.productForm.value

      this.petsService
        .createPet({
          description: description as string,
          image_url: image_url as string,
          name: name as string,
          type: type as string,
          create_at: new Date().toISOString(),
          update_at: new Date().toISOString()
        })
        .subscribe(() => {
          this.getPets()
          this.loading = false

          drawer.hide()
        })
    } else {
      this.productForm.markAllAsTouched()
      this.loading = false
    }
  }

  handleUpdate(): void {
    this.loading = true

    if (this.productForm.valid && this.pet) {
      const { description, image_url, name, type } = this.productForm.value

      this.petsService
        .updatePet(this.pet.id, {
          description: description as string,
          image_url: image_url as string,
          name: name as string,
          type: type as string,
          update_at: new Date().toISOString()
        })
        .subscribe(() => {
          this.getPets()
          this.loading = false
        })
    } else {
      this.productForm.markAllAsTouched()
      this.loading = false
    }
  }

  handleReset(): void {
    if (!this.isEdit) {
      this.productForm.reset()
    }
  }

  // handleResetForm() {
  //   this.productForm.reset()
  // }

  // handleSubmit() {
  //   this.loading = true

  //   try {
  //     // if (this.productForm.valid) {
  //     // console.log(this.productForm) // eslint-disable-line
  //     const { description, image_url, name, type } = this.productForm.value

  //     this.petsService
  //       .createPet({
  //         description: description as string,
  //         image_url: image_url as string,
  //         name: name as string,
  //         type: type as string,
  //         create_at: new Date().toISOString(),
  //         update_at: new Date().toISOString()
  //       })
  //       .subscribe(() => {
  //         this.getPets()
  //         this.loading = false
  //       })

  //     // } else {
  //     //   this.loading = false
  //     // }
  //   } catch (e) {
  //     this.loading = false
  //     this.error = true
  //   }
  // }
}

export interface SimpleChangesProps {
  pet: Pet
}

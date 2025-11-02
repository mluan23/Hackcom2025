import express from 'express';

class Listing {
    constructor(title, image_link, description, price) {
        this.title = title;
        this.image_link = image_link;
        this.description = description;
        this.price = price;
        
    }

    get title() {
        return this.title;
    }

    get image_link() {
        return this.image_link;
    }

    get description() {
        return this.description;
    }

    get price() {
        return this.price;
    }

    set price(p) {
        this.price = p;
    }

    

    // 
}
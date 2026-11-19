import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly carItem: Locator;
    readonly botonCheckout: Locator;
    readonly botonContinuarComprando: Locator;      

    constructor(page: Page) {
        this.page = page;
        this.carItem = page.locator('.cart_item');
        this.botonCheckout = page.locator('#checkout');
        this.botonContinuarComprando = page.locator('#continue-shopping');
    }

    contarItemsCarrito() {
        return this.carItem;
    }

    async irAlCheckout() {
        await this.botonCheckout.click();
    }

    async continuarComprando() {
        await this.botonContinuarComprando.click(); 
    }
    
}
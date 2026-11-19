import { Page, Locator } from "@playwright/test";

export class InventoryPage {
    readonly page: Page;
    readonly titulo: Locator;
    readonly carLink: Locator;
    readonly carBadge: Locator;
    readonly ordenar: Locator;
    readonly textoOrdenado : Locator;
    readonly openMenuButton: Locator;
    readonly logoutButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.titulo = page.getByText('Products');
        this.carLink = page.locator('.shopping_cart_link');
        this.carBadge = page.locator('.shopping_cart_badge');
        this.ordenar = page.getByTestId('product-sort-container');
        this.textoOrdenado = page.getByTestId('inventory-item-name');
        this.openMenuButton = page.getByRole('button', { name: 'Open Menu' });
        this.logoutButton = page.locator('#logout_sidebar_link');
    }

    producto(nombreProducto: string) {
        return this.page.locator('.inventory_item').filter({ hasText: nombreProducto });
    }

    async agregarAlCarrito(nombre: string) {
        await this.producto(nombre).getByRole('button', { name: 'Add to cart' }).click();
    }

    async quitarDelCarrito(nombre: string) {
        await this.producto(nombre).getByRole('button', { name: 'Remove' }).click();
    }

    obtenerCantidadCarrito() {
        return this.carBadge;
    }

    async irAlCarrito() {
        await this.carLink.click();
    }

    async ordenarPor(etiqueta: string) {
        await this.ordenar.selectOption({ label: etiqueta });
    }

    obtenerTextoOrdenado() {
        return this.textoOrdenado.first();
    }

    async logout() {
        await this.openMenuButton.click();
        await this.logoutButton.click();
    }
}

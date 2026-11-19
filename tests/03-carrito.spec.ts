import { test, expect } from "../fixtures/fixtures";
import { loginData } from "../fixtures/data/datalogin";
import { productData } from "../fixtures/data/dataproducts";

test.describe('Carrito de compras', () => {
    test.beforeEach(async ({ loginPage }) => {
        
        const dataLogin = loginData.correcto;

        await loginPage.goto();
        await loginPage.login(dataLogin.username);
    });

    test('Agregar producto especifico', async ({ inventoryPage }) => {
        const backpack = productData.backpack;
        await inventoryPage.agregarAlCarrito(backpack);
        await expect(inventoryPage.obtenerCantidadCarrito()).toHaveText('1');
        await expect(inventoryPage.producto(backpack).getByRole('button', { name: 'Remove' })).toBeEnabled();
    });

    test('Agregar dos productos y quitar uno', async ({ inventoryPage }) => {
        const backpack = productData.backpack;
        const bikeLight = productData.bikeLight;

        await inventoryPage.agregarAlCarrito(backpack);
        await inventoryPage.agregarAlCarrito(bikeLight);
        await expect(inventoryPage.obtenerCantidadCarrito()).toHaveText('2');

        await inventoryPage.quitarDelCarrito(bikeLight)
        await expect(inventoryPage.obtenerCantidadCarrito()).toHaveText('1');
    });

    test('El carrito muestra el producto agregado', async ({ page, inventoryPage, cartPage }) => {
        const backpack = productData.backpack;

        await inventoryPage.agregarAlCarrito(backpack);
        await inventoryPage.irAlCarrito();

        await expect(page).toHaveURL(/.*cart/);
        await expect(cartPage.contarItemsCarrito()).toHaveCount(1);
        await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    });

});





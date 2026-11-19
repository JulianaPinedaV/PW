import { test, expect } from "../fixtures/fixtures";
import { loginData } from "../fixtures/data/datalogin";
import { productData } from "../fixtures/data/dataproducts";

test.describe('Checkout', () => {
    test.beforeEach(async ({ loginPage, inventoryPage, cartPage }) => {

        const dataLogin = loginData.correcto;

        await loginPage.goto();
        await loginPage.login(dataLogin.username);

        // Agregar producto e ir al carrito y luego al checkout
        const backpack = productData.backpack;

        await inventoryPage.agregarAlCarrito(backpack);
        await inventoryPage.irAlCarrito();
        await cartPage.irAlCheckout();
    });

    test('Flujo completo de compra', async ({ page, checkoutPage }) => {

        await checkoutPage.fillCheckoutForm('Juliana', 'Pineda', '170001');
        await checkoutPage.clickContinue();

        // Resumen: verificar producto y total
        const backpack = productData.backpack;
        await expect(checkoutPage.obtenerTexto(backpack)).toBeVisible();
        await expect(checkoutPage.obtenerTexto('Item total: $29.99')).toBeVisible();

        // Finalizar
        await checkoutPage.clickFinish();
        await expect(checkoutPage.obtenerTexto('Thank you for your order!')).toBeVisible();
        await expect(page).toHaveURL(/.*checkout-complete/);
    });

    test('campos vacios', async ({ checkoutPage }) => {
        await checkoutPage.clickContinue();
        await expect(checkoutPage.obtenerTexto('Error: First Name is required')).toBeVisible();
    });

});



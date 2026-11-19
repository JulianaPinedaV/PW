import { test, expect } from "../fixtures/fixtures";
import { loginData } from "../fixtures/data/datalogin";
import { productData } from "../fixtures/data/dataproducts";

test.beforeEach(async ({ loginPage }) => {
   
    const dataLogin = loginData.correcto;

    await loginPage.goto();
    await loginPage.login(dataLogin.username);

});

test('Carrito persistente', async ({ inventoryPage, cartPage }) => {
    const backpack = productData.backpack;
    const bikeLight = productData.bikeLight;

    await inventoryPage.agregarAlCarrito(backpack);
    await inventoryPage.agregarAlCarrito(bikeLight);
    await expect(inventoryPage.obtenerCantidadCarrito()).toHaveText('2');

    await inventoryPage.irAlCarrito();
    await cartPage.continuarComprando();
    await expect(inventoryPage.obtenerCantidadCarrito()).toHaveText('2');

});

test('Compra de 3 productos', async ({ page, inventoryPage, cartPage, checkoutPage }) => {
    const shirt = productData.shirt;
    const jacket = productData.jacket;
    const onesie = productData.onesie;

    await inventoryPage.agregarAlCarrito(shirt);
    await inventoryPage.agregarAlCarrito(jacket);
    await inventoryPage.agregarAlCarrito(onesie);
    await inventoryPage.irAlCarrito();
    await expect(cartPage.contarItemsCarrito()).toHaveCount(3);
    await cartPage.irAlCheckout();

    await checkoutPage.fillCheckoutForm('Juliana', 'Pineda', '170001');
    await checkoutPage.clickContinue();

    // Item total, suma correcta de los precios de los productos
    const preciosProductos = await page.getByTestId('inventory-item-price').allTextContents();

    let totalCalculado = 0;

    for (const precioTexto of preciosProductos) {
        const precioNumero = Number(precioTexto.replace('$', ''));
        totalCalculado += precioNumero;
        0
    }

    const textoItemTotal = await page.getByText(/Item total/).textContent();
    const totalMostrado = Number(textoItemTotal?.replace('Item total: $', ''));
    expect(totalMostrado).toBe(totalCalculado);
});


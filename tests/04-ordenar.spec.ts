import { test, expect } from "../fixtures/fixtures";
import { loginData } from "../fixtures/data/datalogin";

test.describe('Ordenamiento de productos', () => {

    test.beforeEach(async ({ loginPage }) => {
   
        const dataLogin = loginData.correcto;
        
        await loginPage.goto();
        await loginPage.login(dataLogin.username);

    });

    test('Ordenar de menor a mayor', async ({ inventoryPage}) => {
        await inventoryPage.ordenarPor('Price (low to high)');
        await expect(inventoryPage.obtenerTextoOrdenado()).toHaveText('Sauce Labs Onesie');
    });

    test('Ordenar de Z a A', async ({ inventoryPage }) => {
        await inventoryPage.ordenarPor('Name (Z to A)');
        await expect(inventoryPage.obtenerTextoOrdenado()).toHaveText('Test.allTheThings() T-Shirt (Red)');
    });

}); 
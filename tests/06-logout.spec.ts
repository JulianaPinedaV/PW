import { test, expect } from "../fixtures/fixtures";
import { loginData } from "../fixtures/data/datalogin";

test.beforeEach (async ({ loginPage }) => {
    const dataLogin = loginData.correcto;

    await loginPage.goto();
    await loginPage.login(dataLogin.username);

});
    
test ('Logout', async ({ inventoryPage, loginPage }) => {
    await inventoryPage.logout();
    await expect(loginPage.botonLogin).toBeVisible();

});
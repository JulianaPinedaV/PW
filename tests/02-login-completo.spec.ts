import { loginData } from "../fixtures/data/datalogin";
import { expect, test } from "../fixtures/fixtures";

const casosDeErrorLogin = [
    { nombre: 'Password incorrecto', data: loginData.incorrecto, error: 'do not match' },
    { nombre: 'Usuario bloqueado', data: loginData.bloqueado, error: 'locked out' },
    { nombre: 'usuario vacío', data: loginData.vacio, error: 'Username is required' },
];

test.describe('Login', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    test('Login exitoso', async ({ loginPage, inventoryPage, page, browserName }) => {
        const dataLogin = loginData.correcto;
        test.skip(browserName == 'webkit', 'Skipping test on WebKit');
        await loginPage.login(dataLogin.username);
        await expect(page).toHaveURL(/.*inventory/);
        await expect(inventoryPage.titulo).toBeVisible();
    });

    /*  test('Password incorrecto', async ({ loginPage }) => {
         const dataLogin = loginData.incorrecto;
         await loginPage.login(dataLogin.username, dataLogin.password);
         await expect(loginPage.mensajeError).toContainText('do not match');
     }); */

    /* test('Usuario bloquedado', async ({ loginPage, page }) => {
        const dataLogin = loginData.bloqueado;
        await loginPage.login(dataLogin.username);
        // las barras /locked out/ es un regex y sirve para mas flexibilidad 
        await expect(loginPage.mensajeError).toContainText(/locked out/);
        await expect(page).not.toHaveURL(/inventory/);
    }); */

    for (const caso of casosDeErrorLogin) {
        test(`login rechazado: ${caso.nombre}`, async ({ loginPage, page }) => {
            await loginPage.login(caso.data.username, caso.data.password);
            await expect(loginPage.mensajeError).toContainText(caso.error);
            await expect(page).not.toHaveURL(/inventory/);
        });
    }
});


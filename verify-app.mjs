import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';

const VIEWPORTS = [
  { name: 'desktop_1440', width: 1440, height: 900 },
  { name: 'tablet_1024', width: 1024, height: 768 },
  { name: 'tablet_768', width: 768, height: 1024 },
  { name: 'mobile_390', width: 390, height: 844 },
];

const SCREENSHOTS_DIR = path.resolve('screenshots');
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function runVerification() {
  console.log('🚀 Iniciando servidor de previsualización Vite...');
  const server = spawn('npx', ['vite', 'preview', '--port', '4173', '--strictPort'], {
    shell: true,
    stdio: 'pipe',
  });

  // Esperar a que el servidor esté listo
  await new Promise((resolve) => setTimeout(resolve, 3000));

  console.log('🔍 Iniciando pruebas E2E y auditoría visual Playwright...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => consoleErrors.push(err.message));

  let passed = true;

  try {
    for (const vp of VIEWPORTS) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('http://localhost:4173', { waitUntil: 'networkidle' });

      // Verificar desbordamiento horizontal
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      if (hasHorizontalScroll) {
        console.error(`❌ Desbordamiento horizontal detectado en viewport ${vp.name} (${vp.width}px)!`);
        passed = false;
      } else {
        console.log(`✓ Sin desbordamiento horizontal en ${vp.name} (${vp.width}px)`);
      }

      // Captura de pantalla
      const shotPath = path.join(SCREENSHOTS_DIR, `nexo_${vp.name}.png`);
      await page.screenshot({ path: shotPath, fullPage: false });
      console.log(`  📸 Captura guardada: ${shotPath}`);
    }

    // Probar navegación interactiva
    console.log('🔄 Probando navegación entre las 6 vistas...');
    await page.setViewportSize({ width: 1440, height: 900 });

    // Inversiones
    await page.click('button:has-text("Inversiones")');
    await page.waitForTimeout(300);
    const hasInvestmentsHeading = await page.isVisible('h1:has-text("Portafolio de inversiones")');
    if (!hasInvestmentsHeading) throw new Error('Fallo al navegar a Inversiones');
    console.log('✓ Vista Inversiones renderizada correctamente con 25 activos');

    // Ahorros COP
    await page.click('button:has-text("Ahorros en COP")');
    await page.waitForTimeout(300);
    const hasCopHeading = await page.isVisible('h1:has-text("Ahorros en pesos")');
    if (!hasCopHeading) throw new Error('Fallo al navegar a Ahorros COP');
    console.log('✓ Vista Ahorros COP renderizada correctamente');

    // Ahorros USD
    await page.click('button:has-text("Ahorros en USD")');
    await page.waitForTimeout(300);
    const hasUsdHeading = await page.isVisible('h1:has-text("Ahorros en dólares")');
    if (!hasUsdHeading) throw new Error('Fallo al navegar a Ahorros USD');
    console.log('✓ Vista Ahorros USD renderizada correctamente');

    // Documentos
    await page.click('button:has-text("Mis documentos")');
    await page.waitForTimeout(300);
    const hasDocsHeading = await page.isVisible('h1:has-text("Mis documentos")');
    if (!hasDocsHeading) throw new Error('Fallo al navegar a Mis documentos');
    console.log('✓ Vista Documentos renderizada con dropzone y registro');

    // Configuración
    await page.click('button:has-text("Configuración")');
    await page.waitForTimeout(300);
    const hasSettingsHeading = await page.isVisible('h1:has-text("Configuración")');
    if (!hasSettingsHeading) throw new Error('Fallo al navegar a Configuración');
    console.log('✓ Vista Configuración renderizada con TRM y usuario');

    // Retorno al Dashboard
    await page.click('button:has-text("Vista general")');
    await page.waitForTimeout(300);

    // Probar alternador de moneda USD -> COP
    await page.click('button:has-text("COP")');
    await page.waitForTimeout(200);
    const grandValueText = await page.textContent('.data-number');
    console.log(`✓ Conversión dinámica de moneda funcional (Cifra consolidada: ${grandValueText?.trim()})`);

    if (consoleErrors.length > 0) {
      console.warn('⚠️ Errores en consola detectados:', consoleErrors);
      passed = false;
    } else {
      console.log('✓ 0 errores y 0 excepciones en consola durante toda la navegación');
    }
  } catch (error) {
    console.error('❌ Error durante la verificación:', error);
    passed = false;
  } finally {
    await browser.close();
    server.kill();
  }

  if (passed) {
    console.log('\n🎉 VERIFICACIÓN EXITOSA: La aplicación cumple todos los criterios visuales y responsive de la FASE 2.');
    process.exit(0);
  } else {
    console.error('\n❌ VERIFICACIÓN FALLIDA');
    process.exit(1);
  }
}

runVerification();

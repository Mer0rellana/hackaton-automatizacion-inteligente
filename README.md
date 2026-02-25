# Automation in Testing - Pruebas Playwright (TypeScript)

Casos de prueba funcionales y de UI para **https://automationintesting.online/**

**✨ Construido con TypeScript y Faker.js para generación dinámica de datos de prueba!**

## 📋 Cobertura de Pruebas (29 Casos de Prueba)

### 1. Pruebas de Página Principal (6 pruebas)
- TC001: Verificar que la página principal carga exitosamente
- TC002: Verificar que el logo del hotel se muestra
- TC003: Verificar que la descripción del hotel es visible
- TC004: Verificar que existe la sección de contacto
- TC005: Verificar que se muestra la información de habitaciones
- TC006: Verificar que el calendario de reservas está presente

### 2. Pruebas de Formulario de Contacto (7 pruebas) 🎲 **Usa Faker**
- TC007: Verificar que todos los campos del formulario de contacto son visibles
- TC008: Enviar formulario de contacto con datos válidos
- TC009: Verificar validación del campo nombre
- TC010: Verificar validación del campo email
- TC011: Verificar validación del campo teléfono
- TC012: Verificar validación del campo asunto
- TC013: Verificar validación del campo descripción

### 3. Pruebas de Formulario de Reserva (4 pruebas) 🎲 **Usa Faker**
- TC014: Enviar reserva con datos válidos
- TC015: Verificar validación de reserva con nombre vacío
- TC016: Verificar validación de reserva con email inválido
- TC017: Verificar que el botón cancelar limpia el formulario de reserva

### 4. Pruebas de Inicio de Sesión Admin (8 pruebas) 🎲 **Usa Faker**
- TC018: Verificar que el enlace admin está presente en la página principal
- TC019: Navegar a la página de inicio de sesión admin
- TC020: Verificar que el botón de inicio de sesión está presente
- TC021: Iniciar sesión con credenciales válidas
- TC022: Iniciar sesión con nombre de usuario inválido
- TC023: Iniciar sesión con contraseña inválida
- TC024: Iniciar sesión con nombre de usuario vacío
- TC025: Iniciar sesión con contraseña vacía

### 5. Pruebas de Diseño Responsivo (4 pruebas)
- TC026: Verificar que la página principal carga en viewport móvil
- TC027: Verificar menú de navegación en móvil
- TC028: Verificar que el formulario de contacto es visible en móvil
- TC029: Verificar que las imágenes cargan en diferentes viewports


## 🎲 Integración con Faker.js

Las pruebas usan la librería **@faker-js/faker** para generar datos de prueba dinámicos y realistas:

### Métodos Faker Disponibles

```typescript
import { faker } from '@faker-js/faker';

// Información Personal
faker.person.fullName()       // "Juan Pérez"
faker.person.firstName()      // "Juan"
faker.person.lastName()       // "Pérez"

// Internet
faker.internet.email()        // "juan.perez@example.com"
faker.internet.username()     // "juan.perez123"
faker.internet.password()     // "x8Jk9mPq"

// Teléfono y Números
faker.string.numeric(11)      // "01234567890"
faker.number.int({min, max})  // Número aleatorio

// Texto
faker.lorem.sentence()        // "Lorem ipsum dolor sit amet."
faker.lorem.words(3)          // "lorem ipsum dolor"
```

## 🚀 Configuración

### Prerequisitos
- Node.js (v16+)
- npm

### Instalación

```bash
# Instalar dependencias (incluye Faker y TypeScript)
npm install

# Instalar navegadores de Playwright
npx playwright install
```

## 🧪 Ejecutar Pruebas

### Ejecutar todas las pruebas
```bash
npm test
```

### Ejecutar archivos de prueba específicos
```bash
npm run test:homepage      # Pruebas de página principal
npm run test:contact       # Pruebas de formulario de contacto (con Faker)
npm run test:booking       # Pruebas de formulario de reserva (con Faker)
npm run test:admin         # Pruebas de inicio de sesión admin (con Faker)
npm run test:responsive    # Pruebas responsivas
```

### Ejecutar con modo UI (interactivo)
```bash
npm run test:ui
```

### Ejecutar en modo headed (ver navegador)
```bash
npm run test:headed
```

### Depurar pruebas
```bash
npm run test:debug
```

### Ver reporte de pruebas
```bash
npm run report
```

## 📊 Resultados de Pruebas

Después de ejecutar las pruebas, ver el reporte HTML:
```bash
npm run report
```

El reporte incluye:
- ✅ Pruebas pasadas
- ❌ Pruebas fallidas
- 📸 Capturas de pantalla en fallo
- 🎥 Videos en fallo
- 📝 Registros detallados

## 📁 Estructura del Proyecto

```
playwright-simple-tests/
├── tests/
│   ├── 01homepage.spec.ts        # Pruebas de página principal
│   ├── 02contact-form.spec.ts    # Pruebas de formulario de contacto (usa Faker)
│   ├── 03booking-form.spec.ts    # Pruebas de formulario de reserva (usa Faker)
│   ├── 04admin-login.spec.ts     # Pruebas admin (usa Faker)
│   └── 05responsive.spec.ts      # Pruebas de diseño responsivo
├── playwright.config.ts          # Configuración de Playwright (TypeScript)
├── tsconfig.json                 # Configuración de TypeScript
├── package.json                  # Dependencias
└── README.md                     # Este archivo
```

## 🎯 Beneficios de TypeScript

✅ **Seguridad de Tipos** - Detecta errores en tiempo de compilación  
✅ **Mejor Soporte IDE** - Auto-completado e intellisense  
✅ **Código Más Limpio** - Tipos e interfaces explícitas  
✅ **Mantenible** - Más fácil de refactorizar y actualizar  
✅ **Profesional** - Estándar de la industria para proyectos grandes

## 🎲 Beneficios de Usar Faker

✅ **Datos de Prueba Únicos** - Cada ejecución usa datos diferentes  
✅ **Datos Realistas** - Nombres, emails y texto lucen auténticos  
✅ **Sin Valores Codificados** - Pruebas más mantenibles  
✅ **Mejor Cobertura** - Pruebas con entradas variadas  
✅ **Fácil de Usar** - API simple para generar datos

## 📝 Ejemplo: Usando Faker en Pruebas

```typescript
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('Enviar formulario de contacto con datos Faker', async ({ page }) => {
  await page.goto('/');
  
  // Generar datos de prueba aleatorios
  const testData = {
    name: faker.person.fullName(),        
    email: faker.internet.email(),         
    phone: faker.string.numeric(11),       
    subject: faker.lorem.words(3),         
    message: faker.lorem.sentence(10)      
  };

  // Usar datos generados en la prueba
  await page.fill('#name', testData.name);
  await page.fill('#email', testData.email);
  await page.fill('#phone', testData.phone);
  await page.fill('#subject', testData.subject);
  await page.fill('#message', testData.message);
  
  await page.click('#submit');
});
```

## ⚙️ Configuración

Editar `playwright.config.ts` para personalizar:
- Timeout de pruebas
- URL base
- Configuración de navegador
- Opciones de capturas/videos
- Ejecución paralela

## 🔧 Credenciales Admin

Credenciales admin por defecto para pruebas:
- **Usuario:** admin
- **Contraseña:** password

## 📝 Notas

- Las pruebas están escritas en **TypeScript** para seguridad de tipos
- Cada prueba es independiente y puede ejecutarse sola
- Las pruebas incluyen esperas apropiadas para contenido dinámico
- Los fallos se capturan con capturas de pantalla y videos
- Todas las pruebas son funcionales y enfocadas en UI
- **Faker genera datos únicos en cada ejecución de prueba**

## 🐛 Solución de Problemas

Si las pruebas fallan:
1. Verificar si el sitio web es accesible
2. Revisar capturas de pantalla en la carpeta `test-results/`
3. Usar `npm run test:debug` para depuración paso a paso
4. Revisar logs de consola del navegador en modo headed
5. Verificar que Faker está generando formatos de datos válidos
6. Revisar errores de compilación de TypeScript

## 📖 Documentación

- [Documentación Playwright TypeScript](https://playwright.dev/docs/test-typescript)
- [Documentación Faker.js](https://fakerjs.dev/)
- [Documentación TypeScript](https://www.typescriptlang.org/)

## 📄 Licencia

ISC

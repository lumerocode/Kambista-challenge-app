# Kambista Challenge App

Aplicación móvil desarrollada como solución técnica para un flujo de onboarding y simulación de cambio de divisas. 
Está construida con `Expo`, `React Native` y `NativeWind` para lograr una experiencia móvil limpia y responsiva.

## Tecnologías

- `Expo` para el entorno móvil multiplataforma
- `React Native 0.81.5`
- `TypeScript`
- `NativeWind` + `Tailwind CSS` para estilos declarativos
- `react-native-safe-area-context` para manejo de área segura
- `react-native-svg` para iconos SVG
- `@expo-google-fonts/montserrat` para tipografía
- `@react-native-picker/picker` para select nativo

## Estructura del proyecto

- `App.tsx` - Punto de entrada de la aplicación. Carga fuentes, maneja estado global y renderiza la ruta actual.
- `app.json` - Configuración de Expo.
- `babel.config.js` - Configuración de Babel para Expo y transformadores SVG.
- `metro.config.js` - Configuración de Metro bundler para SVG.
- `tailwind.config.js` - Configuración de Tailwind para `NativeWind`.

### `src/`

- `src/assets/` - Imágenes, iconos, ilustraciones y recursos SVG.
- `src/components/` - Componentes reutilizables y específicos de pantalla.
- `src/context/` - Contextos globales para navegación de pantalla y lógica de intercambio.
- `src/screens/` - Pantallas de la app: onboarding, login, dashboard, flujo de operación y resumen.
- `src/services/` - Integraciones y simulaciones de APIs.
- `src/types/` - Tipos TypeScript compartidos.
- `src/utils/` - Utilerías de formato y validación.

## Características principales

- Flujo de bienvenida y autenticación mock
- Onboarding de perfil con validaciones de datos
- Pantalla principal con dashboard de exchange
- Selector de tipo de operación (comprar / vender)
- Simulación de tasa de cambio y cálculo de montos
- Botón de intercambio entre moneda origen y destino
- Secciones de cupón y promoción dentro del flujo de cálculo

## Cómo ejecutar

Instala dependencias:

```bash
npm install
```

Inicia el proyecto en modo desarrollo:

```bash
npm start
```

Opciones de uso:

```bash
npm run android
npm run ios
npm run web
```

> Si usan `Expo Go`, escaneen el código QR que aparece en la terminal o en el navegador.

## Notas importantes

- El proyecto está configurado como app privada de Expo.
- Los datos del flujo son de simulación y no hacen llamadas a servicios reales.
- El estado global de navegación está gestionado mediante `AppStateContext`.
- La lógica de cálculo de intercambio se encuentra en `src/context/ExchangeContext.tsx`.

## Scripts disponibles

- `npm start` - Ejecuta Expo CLI.
- `npm run android` - Abre la app en un emulador Android o dispositivo conectado.
- `npm run ios` - Abre la app en un emulador iOS o dispositivo conectado.
- `npm run web` - Inicia la versión web de Expo.

## Consideraciones

- Usa `nativewind` y `tailwindcss` para estilos basados en clases.
- Los iconos SVG se importan directamente gracias a `react-native-svg-transformer`.
- No hay persistencia de datos en backend; el comportamiento es local y preparado para demostración.

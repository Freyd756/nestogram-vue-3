/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
// @ts-ignore
import { loadFonts } from './webfontloader'

// Types
import type { App } from 'vue'

export async function registerPlugins (app: App) {
 await loadFonts()
}

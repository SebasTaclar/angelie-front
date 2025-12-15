type LogArgs = unknown[]

/**
 * Logger centralizado.
 * - En dev: escribe en consola.
 * - En producción: no hace nada.
 */
export function devLog(...args: LogArgs) {
	if (import.meta.env.DEV) {
		console.log(...args)
	}
}

export function devInfo(...args: LogArgs) {
	if (import.meta.env.DEV) {
		console.info(...args)
	}
}

export function devWarn(...args: LogArgs) {
	if (import.meta.env.DEV) {
		console.warn(...args)
	}
}

export function devError(...args: LogArgs) {
	if (import.meta.env.DEV) {
		console.error(...args)
	}
}

# Auditoría técnica final - Fiscalización B.I.

## Identificación

- Nombre visible e instalable: **Fiscalización B.I.**
- Liberación técnica interna: **18.1.1**.
- El número técnico no se muestra en el nombre instalado.
- Alcance: ubicación visual y documental de **Observaciones del expediente**.

## Cambio aplicado

1. El campo Observaciones fue retirado del bloque inicial de identificación del inmueble.
2. El campo fue colocado al final del módulo Expediente, junto a Inicio de captura.
3. La vista previa/PDF muestra Observaciones en la misma fila del encabezado que Inicio de captura.
4. Word reproduce la misma ubicación lógica.
5. Observaciones ya no aparece dentro de **Datos del inmueble**.
6. Se conserva el mismo dato `general.observations`, por lo que no se pierde información existente ni se altera la importación, el autocompletado, IndexedDB, JSON o Excel.
7. Se actualizó únicamente la versión técnica y el caché PWA para publicar la corrección.

## Componentes congelados

No se modificaron Terreno, vías, servicios, construcciones, croquis, fotografías, fiscalización, decisiones, anexos, resumen constructivo, firmas, ordenamiento documental, reglas de anexos, almacenamiento ni navegación.

## Validaciones

- HTML analizado sin identificadores duplicados.
- JavaScript validado con `node --check`.
- Manifiesto PWA válido y nombre instalable sin versión.
- Campo Observaciones presente una sola vez en el formulario de Expediente.
- Observaciones ausente del bloque Datos del inmueble en HTML/PDF y Word.
- Observaciones presente junto a Inicio de captura en HTML/PDF y Word.
- Caché PWA actualizado para sustituir la liberación anterior.

## Resultado

**Apto para cargar en GitHub Pages.** Se recomienda actualizar los archivos del repositorio completo y recargar la aplicación instalada para activar el nuevo service worker.

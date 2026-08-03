# Auditoría técnica de liberación - Libreta de Fiscalización V17.1 Final

**Versión:** 17.1.0  
**Fecha:** 2 de agosto de 2026  
**Plataforma prioritaria:** teléfono y tablet mediante PWA y GitHub Pages.

## Alcance del cambio V17.1

La funcionalidad de los módulos quedó congelada. Esta liberación modifica únicamente la presentación del informe en vista previa/PDF y Word:

- el encabezado del bloque pasa a **Resumen constructivo**;
- las tres celdas del resumen reducen altura, tipografía y espacio interno;
- se restablece el formato aprobado de firmas, con datos a la izquierda y firma a la derecha dentro de un solo marco;
- el mismo formato se usa para el responsable de campo y para **Resolución administrativa - Avalada por**.

No se modificaron formularios, modelos de datos, cálculos, criterios, navegación, persistencia, croquis, fotografías, geolocalización, importación, exportación, auditoría del expediente ni envío.

## Validación funcional congelada

Se compararon las funciones críticas de V17.0 y V17.1. Permanecen sin cambios:

- creación, normalización, carga, guardado y eliminación de expedientes;
- captura y edición de construcciones;
- procesamiento fotográfico;
- GNSS;
- auditoría interna;
- importación de Excel;
- envío y cola sin conexión;
- cálculo del resumen constructivo;
- análisis de componentes aplicables;
- decisión de fiscalización;
- anexo de determinación administrativa.

Los únicos generadores modificados fueron `buildReportHtml()` y `makeDocx()`, junto con auxiliares visuales de firma.

## Prueba integral

Caso de prueba validado:

- 3 construcciones declaradas;
- 2 construcciones en m², con 103,75 m² en total;
- 1 construcción lineal, con 18,00 ML;
- terreno conforme;
- construcciones no conformes por diferencia de valor;
- decisión **OBJETAR (RECHAZAR)**;
- motivación con referencia al Anexo de Determinación del Valor Administrativo;
- dos fotografías;
- firmas de inspector y aval;
- anexo constructivo cargado.

## Resultado de QA

- JavaScript principal: sintaxis válida.
- Consola del navegador: sin errores.
- PDF: 7 páginas, sin recortes, superposiciones ni páginas vacías.
- Word editable: 7 páginas renderizadas correctamente.
- PDF y Word mantienen el mismo contenido, orden, jerarquía y bloques.
- Resumen constructivo compacto en una sola fila.
- Firmas laterales verificadas en ambos formatos.
- Móvil 390 px: sin desplazamiento horizontal.
- Tablet 820 px: sin desplazamiento horizontal.
- Versión interna y manifiesto: 17.1.0.
- Caché PWA: `libreta-v17-1-final-build-1`.

## Publicación

El contenido del ZIP puede cargarse directamente en la raíz de un repositorio de GitHub y publicarse con GitHub Pages. La instalación PWA requiere HTTPS. En Android y tablet se utiliza **Instalar aplicación**; en iPhone/iPad, Safari > Compartir > **Agregar a pantalla de inicio**.

La validación física de cámara, ubicación e instalación debe realizarse en los dispositivos institucionales después de publicar el proyecto.

# Fiscalización B.I.

Aplicación PWA municipal para inspección y fiscalización de bienes inmuebles. El nombre visible e instalable es **Fiscalización B.I.**; la numeración técnica de liberación se mantiene únicamente en los documentos de auditoría.

## Publicación en GitHub Pages

1. Cargue todos los archivos y carpetas de este paquete en la raíz del repositorio.
2. Abra **Settings > Pages**.
3. En **Build and deployment**, seleccione **Deploy from a branch**.
4. Seleccione la rama principal y la carpeta **/(root)**.
5. Abra la dirección HTTPS publicada y recargue una vez para completar el registro del service worker.

## Instalación

- **Android y tablet:** Chrome o Edge > **Instalar** o menú > **Instalar aplicación**.
- **iPhone y iPad:** Safari > Compartir > **Agregar a pantalla de inicio**.
- **Computadora:** Chrome o Edge > menú > **Instalar Fiscalización B.I.**. Es una instalación PWA, no un archivo EXE.

## Datos e informe

- Los expedientes se conservan localmente mediante IndexedDB.
- El módulo Expediente incorpora Fecha de declaración y Observaciones. El campo Observaciones se ubica al final, junto a Inicio de captura; conserva autocompletado, importación y persistencia.
- La lista se ordena por distrito, lugar y fecha de inspección; dentro del mismo lugar, primero aparece la fecha más reciente.
- Los nombres de las descargas siguen el orden `Distrito_Lugar_Fecha_Expediente`.
- Los anexos de valoración solo se incorporan cuando el valor correspondiente está marcado como **No conforme**. Si el valor fue aceptado, no se adjuntan aunque permanezcan guardados.
- En vista previa/PDF y Word, Observaciones aparece en el encabezado junto a Inicio de captura y no dentro de Datos del inmueble.
- Vista previa/PDF y Word utilizan la misma lógica narrativa y conservan el modelo aprobado de resumen constructivo y firmas.

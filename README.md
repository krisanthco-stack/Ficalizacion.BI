# Fiscalización B.I.

Aplicación PWA municipal para inspección y fiscalización de bienes inmuebles. El nombre visible e instalable es **Fiscalización B.I.**; la numeración técnica se conserva únicamente para control interno de la liberación.

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

## Envío institucional de Word y PDF

La liberación incorpora un botón **Enviar Word + PDF** en el punto de firma de quien avala y en la gestión del expediente.

- Destinatario fijo: `catastro@sarapiqui.go.cr`.
- Asunto generado: `Fiscalización` seguido del número de trámite.
- El botón solo queda disponible después de completar el número de trámite, los datos del funcionario que avala, la fecha, la hora y su firma.
- Antes del envío se ejecuta la auditoría del expediente; los errores críticos deben quedar corregidos.
- El Word editable se genera con el mismo modelo del informe y el PDF se produce en la pasarela autorizada.
- Si el dispositivo no tiene conexión o la pasarela no confirma el envío, el expediente queda marcado en una cola local para reintento.
- La aplicación no contiene contraseñas de Gmail, Microsoft ni SMTP.

Para activar el envío, siga `CONFIGURACION_CORREO_INSTITUCIONAL.md` y despliegue la pasarela incluida en `backend/google-apps-script/` con la cuenta remitente autorizada.

## Datos e informe

- Los expedientes se conservan localmente mediante IndexedDB.
- El módulo Expediente incorpora Fecha de declaración y Observaciones. El campo Observaciones se ubica al final, junto a Inicio de captura; conserva autocompletado, importación y persistencia.
- La gestión de expedientes presenta una jerarquía visible por distrito. Dentro de cada distrito, el número de trámite más antiguo aparece primero y el poblado queda destacado como subclasificación.
- La lista y sus botones se adaptan a computadora, tableta y celular sin alterar los expedientes ya guardados.
- Los nombres de las descargas siguen el orden `Distrito_Lugar_Fecha_Expediente`.
- Los anexos de valoración solo se incorporan cuando el valor correspondiente está marcado como **No conforme**. Si el valor fue aceptado, no se adjuntan aunque permanezcan guardados.
- En vista previa/PDF y Word, Observaciones aparece en el encabezado junto a Inicio de captura y no dentro de Datos del inmueble.
- Vista previa/PDF y Word utilizan la misma lógica narrativa y conservan el modelo aprobado de resumen constructivo y firmas.

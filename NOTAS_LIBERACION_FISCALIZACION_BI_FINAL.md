# Fiscalización B.I. - Notas de liberación

El nombre visible e instalable permanece como **Fiscalización B.I.**. La referencia técnica interna de esta liberación no se muestra en el nombre de la aplicación instalada.

## Cambio incorporado

- Se reorganizó la gestión de expedientes con la jerarquía **Distrito → número de trámite más antiguo → poblado**.
- Cada distrito se muestra como una sección independiente con conteo de trámites y prioridad numérica visible.
- El poblado, la fecha de declaración, la fecha de inspección, la finca y el plano se muestran de forma legible en cada expediente.
- La nueva lista se adapta a computadora, tableta y celular; los botones conservan áreas táctiles adecuadas y no se modifica la información ya almacenada.
- Se agregó el envío institucional del informe en **Word editable y PDF**.
- El destinatario está fijado en el servidor como `catastro@sarapiqui.go.cr`.
- El asunto se genera como `Fiscalización` más el número de trámite del expediente.
- La acción aparece junto al bloque de firma de quien avala y también en la gestión de expedientes.
- El envío se habilita únicamente al completar el número de trámite, funcionario, puesto, fecha, hora y firma de quien avala.
- Se conserva la auditoría previa: un informe con errores críticos no se envía.
- Los intentos sin conexión o sin confirmación quedan en una cola local para reintento.
- Se incluyó una pasarela de Google Apps Script que usa autorización OAuth de la cuenta remitente y no expone contraseñas de correo en GitHub ni en la PWA.
- Se agregó documentación para una futura alternativa Microsoft 365 mediante Microsoft Graph o Power Automate.

## Funcionalidad conservada

Permanecen sin cambios los módulos de Expediente, Terreno, vías, servicios, construcciones, croquis, fotografías, fiscalización, decisiones, anexos, almacenamiento, importación y diseño del informe. Se mantiene la regla de no incluir anexos cuando los valores son aceptados.

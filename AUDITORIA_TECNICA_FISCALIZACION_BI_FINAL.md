# Auditoría técnica final - Fiscalización B.I.

## Identificación

- Nombre visible e instalable: **Fiscalización B.I.**.
- Liberación técnica interna: **18.3.0**.
- La numeración técnica no se muestra en el nombre instalado.
- Alcance: orden jerárquico y visualización multidispositivo de expedientes, conservando la generación y el envío institucional de Word y PDF.

## Implementación

1. Se agregó **Enviar Word + PDF** junto a la firma de quien avala, en la salida del informe y en la gestión de expedientes.
2. El destinatario está fijado en la pasarela como `catastro@sarapiqui.go.cr`.
3. El asunto se reconstruye en el servidor como `Fiscalización` más el número de trámite.
4. El envío exige número de trámite, funcionario, puesto, fecha, hora y firma de quien avala.
5. La auditoría existente continúa bloqueando el envío cuando existen errores críticos.
6. El Word se genera mediante el motor DOCX ya aprobado por el proyecto.
7. El PDF se genera en la pasarela a partir del mismo contenido HTML del informe.
8. La pasarela se autentica con un código exclusivo definido en las propiedades de Apps Script; no se incluyeron contraseñas de Gmail, Microsoft ni SMTP.
9. Se implementó confirmación de servidor, prevención temporal de solicitudes duplicadas y cola local de reintento.
10. Se actualizó el caché PWA para distribuir la nueva liberación.
11. La lista se separó visualmente por distrito y se ordenó por número de trámite ascendente, dejando primero el trámite más antiguo.
12. El poblado se muestra como subclasificación destacada y se agregaron contadores de expedientes, distritos y poblados.
13. La estructura de tarjetas y acciones se adaptó a computadora, tableta y celular sin migrar ni alterar los registros de IndexedDB.

## Componentes congelados

No se modificaron los cálculos, catálogos, formularios de Terreno, vías, servicios, construcciones, croquis, fotografías, criterios de fiscalización, decisiones, diseño aprobado del informe, firmas, almacenamiento, importación ni regla de anexos.

## Límite de la validación

La pasarela incluida debe desplegarse y autorizarse desde la cuenta remitente. La prueba real de entrega a Gmail o Microsoft no puede ejecutarse hasta disponer de la dirección `/exec` del despliegue institucional. La liberación valida localmente la generación del contenido, las condiciones de habilitación y la integración del flujo, pero no afirma una entrega real sin ese despliegue.

## Validaciones ejecutadas

- `app-inline.js` y el JavaScript incorporado en `index.html` pasan `node --check` y son idénticos por SHA-256.
- `Code.gs` pasa la validación sintáctica ECMAScript con Node.js en modo V8.
- El manifiesto conserva el nombre instalable **Fiscalización B.I.** sin número de versión y el identificador estable `./fiscalizacion-bi`.
- Se verificaron 102 identificadores HTML sin duplicados.
- Se verificó la presencia de los tres accesos de envío, la posición del botón junto a la firma y las reglas de habilitación.
- Se verificó que el destinatario y el asunto se impongan nuevamente en el servidor y no puedan sustituirse desde el navegador.
- Se verificó la generación del Word mediante el motor existente, la conversión PDF en la pasarela y el envío de ambos blobs como adjuntos.
- Se verificó que no exista en el paquete la contraseña de aplicación compartida ni otra contraseña SMTP.
- Se verificó que la regla de anexos aceptados permanezca intacta.
- Se verificó el orden natural ascendente de números de trámite, incluyendo ceros y secuencias de distinta longitud.
- Se verificó la separación por distrito, el poblado destacado y los puntos de adaptación para computadora, tableta y celular.
- Resultado detallado: `QA_RESULTADOS.json`, con todas las comprobaciones aprobadas.

## Resultado

**Paquete apto para cargar en GitHub Pages, pendiente únicamente de desplegar y autorizar la pasarela institucional.** Después del despliegue debe realizarse una prueba real de extremo a extremo con un expediente de prueba, confirmar la llegada del Word y PDF a `catastro@sarapiqui.go.cr` y validar la apariencia del PDF producido por la cuenta institucional.

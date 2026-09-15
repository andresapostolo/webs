# AbogadoDeuda — Amor Romano Larroca Abogados Asociados

Sitio estático. No requiere build ni dependencias: subí la carpeta completa a
cualquier hosting (o abrí index.html localmente).

## Archivos

    index.html          estructura y contenido
    styles.css          todos los estilos (variables de color y tipografía arriba)
    script.js           header que se oculta al scrollear, menú mobile,
                        acordeón de áreas, FAQ, reveal de "por qué elegirnos",
                        envío del formulario
    assets/             imágenes (isotipo + fotos del estudio)

## Notas de implementación

- Tipografía: Montserrat desde Google Fonts (link en el <head>).
- Paleta y medidas se controlan desde las variables CSS en :root (styles.css).
- Las fotos usan un filtro SVG duotono (#arld-duo, definido al inicio del body).
  Para verlas sin tratamiento, quitar filter en .hero__photo-frame img y
  .quienes__photo img.
- El formulario de contacto NO envía nada: script.js solo muestra el mensaje de
  confirmación. Hay que conectarlo a un endpoint del servidor o a un servicio de
  formularios.
- El isotipo del header está a 44px. Para usos más grandes conviene el archivo
  vectorial (SVG/AI) del logo.
- Datos a confirmar antes de publicar: perfiles de redes sociales (hoy apuntan a
  "#"), links de Política de Privacidad y Términos, y el email de contacto
  (el pie tiene tres bloques: teléfono, WhatsApp y dirección).

"use strict";

/* ========================================================= */
/* ESPERAR A QUE EL DOCUMENTO ESTÉ CARGADO */
/* ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    activarPreloader();
    activarMenuMovil();
    activarEncabezado();
    activarAnimacionesScroll();
    activarComparador();
    activarFiltrosCatalogo();
    activarModalProductos();
    activarCuestionario();
    activarJuegoSimbolos();
    activarFormulario();
    activarPuntosMapa();
    actualizarAnio();

});


/* ========================================================= */
/* PANTALLA DE CARGA */
/* ========================================================= */

function activarPreloader() {

    const preloader = document.getElementById("preloader");

    if (!preloader) {
        return;
    }

    window.addEventListener("load", function () {

        setTimeout(function () {

            preloader.classList.add("oculto");

        }, 700);

        setTimeout(function () {

            preloader.style.display = "none";

        }, 1500);

    });

}


/* ========================================================= */
/* MENÚ PARA CELULARES Y TABLETAS */
/* ========================================================= */

function activarMenuMovil() {

    const botonMenu = document.getElementById("botonMenu");
    const menuPrincipal = document.getElementById("menuPrincipal");
    const enlacesMenu = document.querySelectorAll(".menu-principal a");

    if (!botonMenu || !menuPrincipal) {
        return;
    }

    botonMenu.addEventListener("click", function () {

        botonMenu.classList.toggle("activo");
        menuPrincipal.classList.toggle("activo");
        document.body.classList.toggle("menu-abierto");

        const menuAbierto = menuPrincipal.classList.contains("activo");

        botonMenu.setAttribute(
            "aria-label",
            menuAbierto ? "Cerrar menú" : "Abrir menú"
        );

    });


    enlacesMenu.forEach(function (enlace) {

        enlace.addEventListener("click", function () {

            botonMenu.classList.remove("activo");
            menuPrincipal.classList.remove("activo");
            document.body.classList.remove("menu-abierto");

            botonMenu.setAttribute("aria-label", "Abrir menú");

        });

    });


    window.addEventListener("resize", function () {

        if (window.innerWidth > 1050) {

            botonMenu.classList.remove("activo");
            menuPrincipal.classList.remove("activo");
            document.body.classList.remove("menu-abierto");

        }

    });

}


/* ========================================================= */
/* CAMBIO DEL ENCABEZADO AL HACER SCROLL */
/* ========================================================= */

function activarEncabezado() {

    const encabezado = document.getElementById("encabezado");

    if (!encabezado) {
        return;
    }

    function revisarScroll() {

        if (window.scrollY > 50) {

            encabezado.classList.add("scrolled");

        } else {

            encabezado.classList.remove("scrolled");

        }

    }

    revisarScroll();

    window.addEventListener("scroll", revisarScroll);

}


/* ========================================================= */
/* ANIMACIONES AL APARECER EN PANTALLA */
/* ========================================================= */

function activarAnimacionesScroll() {

    const elementosAnimados = document.querySelectorAll(".animar");

    if (!elementosAnimados.length) {
        return;
    }

    if (!("IntersectionObserver" in window)) {

        elementosAnimados.forEach(function (elemento) {

            elemento.classList.add("visible");

        });

        return;
    }

    const observador = new IntersectionObserver(

        function (entradas, observer) {

            entradas.forEach(function (entrada) {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add("visible");
                    observer.unobserve(entrada.target);

                }

            });

        },

        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }

    );

    elementosAnimados.forEach(function (elemento) {

        observador.observe(elemento);

    });

}


/* ========================================================= */
/* COMPARADOR DE BOCETO Y RESULTADO */
/* ========================================================= */

function activarComparador() {

    const controlComparador = document.getElementById("controlComparador");
    const imagenAntes = document.getElementById("imagenAntes");
    const lineaComparador = document.getElementById("lineaComparador");

    if (!controlComparador || !imagenAntes || !lineaComparador) {
        return;
    }

    function actualizarComparador() {

        const valor = controlComparador.value;

        imagenAntes.style.width = valor + "%";
        lineaComparador.style.left = valor + "%";

    }

    controlComparador.addEventListener("input", actualizarComparador);

    actualizarComparador();

}


/* ========================================================= */
/* FILTROS DEL CATÁLOGO */
/* ========================================================= */

function activarFiltrosCatalogo() {

    const botonesFiltro = document.querySelectorAll(".filtro");
    const productos = document.querySelectorAll(".producto");

    if (!botonesFiltro.length || !productos.length) {
        return;
    }

    botonesFiltro.forEach(function (boton) {

        boton.addEventListener("click", function () {

            const categoriaSeleccionada = boton.dataset.filtro;

            botonesFiltro.forEach(function (otroBoton) {

                otroBoton.classList.remove("activo");

            });

            boton.classList.add("activo");


            productos.forEach(function (producto) {

                const categoriasProducto =
                    producto.dataset.categoria || "";

                const mostrarProducto =
                    categoriaSeleccionada === "todos" ||
                    categoriasProducto
                        .split(" ")
                        .includes(categoriaSeleccionada);

                if (mostrarProducto) {

                    producto.classList.remove("oculto");

                } else {

                    producto.classList.add("oculto");

                }

            });

        });

    });

}


/* ========================================================= */
/* INFORMACIÓN DE LOS PRODUCTOS */
/* ========================================================= */

const productosSouvenirs = {

    llavero: {

        titulo: "Llavero",

        categoria: "Accesorio cultural",

        imagen: "img/souvenirs/llavero.jpg",

        descripcion:
            "Souvenir compacto que utiliza un módulo geométrico inspirado en el sistema visual del proyecto.",

        significado:
            "Representa la posibilidad de llevar una pequeña parte de la identidad cultural de Quimiag en un objeto cotidiano.",

        materiales:
            "Acrílico, madera, metal o PVC, dependiendo del tipo de producción seleccionado.",

        tecnica:
            "Impresión UV, corte láser, grabado o aplicación de vinil adhesivo.",

        publico:
            "Turistas, estudiantes, deportistas, visitantes y habitantes de Riobamba.",

        uso:
            "Recuerdo turístico, accesorio para llaves, mochilas, bolsos o estuches.",

        variantes:
            "Rojo tierra, azul profundo, amarillo maíz y verde páramo."

    },


    gorra: {

        titulo: "Gorra",

        categoria: "Producto textil",

        imagen: "img/souvenirs/gorra.jpg",

        descripcion:
            "Prenda urbana que integra el sistema gráfico Puruhá con una estética contemporánea y deportiva.",

        significado:
            "Relaciona la identidad cultural con el movimiento, el deporte y la vida cotidiana.",

        materiales:
            "Algodón, poliéster, gabardina, hilo de bordado y cierre regulable.",

        tecnica:
            "Bordado computarizado, serigrafía o transferencia térmica.",

        publico:
            "Jóvenes, turistas, deportistas y asistentes a eventos culturales o deportivos.",

        uso:
            "Producto promocional, recuerdo turístico, uniforme o accesorio urbano.",

        variantes:
            "Negra con bordado amarillo, crema con bordado rojo y azul con detalles blancos."

    },


    taza: {

        titulo: "Taza",

        categoria: "Objeto de uso diario",

        imagen: "img/souvenirs/taza.jpg",

        descripcion:
            "Taza decorada con una franja modular inspirada en la geometría cultural del proyecto.",

        significado:
            "Integra la identidad Puruhá en un objeto cotidiano y funcional.",

        materiales:
            "Cerámica blanca, cerámica esmaltada o material térmico.",

        tecnica:
            "Sublimación, serigrafía vitrificable o impresión especializada.",

        publico:
            "Turistas, estudiantes, docentes, trabajadores y coleccionistas.",

        uso:
            "Consumo de bebidas, recuerdo turístico, regalo institucional o elemento decorativo.",

        variantes:
            "Fondo blanco, crema, rojo tierra o azul profundo."

    },


    libreta: {

        titulo: "Libreta",

        categoria: "Papelería cultural",

        imagen: "img/souvenirs/libreta.jpg",

        descripcion:
            "Libreta portátil con portada inspirada en la identidad visual de Raíces en Movimiento.",

        significado:
            "Representa el registro de ideas, historias, recuerdos y conocimientos.",

        materiales:
            "Cartulina laminada, papel bond, papel reciclado, anillado metálico o cosido.",

        tecnica:
            "Impresión digital, offset, laminado mate y encuadernación.",

        publico:
            "Estudiantes, turistas, profesionales y visitantes de ferias culturales.",

        uso:
            "Notas, dibujos, apuntes, recuerdos de viaje y actividades académicas.",

        variantes:
            "Diseño geométrico completo, módulo central o patrón lateral."

    },


    estuche: {

        titulo: "Estuche de celular",

        categoria: "Accesorio tecnológico",

        imagen: "img/souvenirs/estuche-celular.jpg",

        descripcion:
            "Protector para celular que aplica los módulos culturales en un soporte tecnológico contemporáneo.",

        significado:
            "Conecta la memoria cultural con las nuevas formas de comunicación digital.",

        materiales:
            "Silicona, policarbonato, plástico rígido o material flexible.",

        tecnica:
            "Impresión UV, sublimación o impresión directa sobre carcasa.",

        publico:
            "Jóvenes, estudiantes, turistas y usuarios de dispositivos móviles.",

        uso:
            "Protección y personalización del teléfono celular.",

        variantes:
            "Patrón completo, símbolo individual, versión clara y versión oscura."

    },


    termo: {

        titulo: "Termo",

        categoria: "Objeto reutilizable",

        imagen: "img/souvenirs/termo.jpg",

        descripcion:
            "Recipiente reutilizable que incorpora una banda gráfica inspirada en el territorio y la cultura Puruhá.",

        significado:
            "Relaciona la identidad cultural con el cuidado ambiental y el uso responsable de recursos.",

        materiales:
            "Acero inoxidable, aluminio, plástico libre de BPA o recubrimiento térmico.",

        tecnica:
            "Sublimación, impresión UV, grabado láser o vinil permanente.",

        publico:
            "Deportistas, turistas, estudiantes y visitantes del estadio.",

        uso:
            "Transporte de bebidas durante actividades académicas, deportivas o turísticas.",

        variantes:
            "Azul, negro, blanco, rojo y acero natural."

    },


    cuaderno: {

        titulo: "Cuaderno",

        categoria: "Papelería académica",

        imagen: "img/souvenirs/cuaderno.jpg",

        descripcion:
            "Cuaderno de formato académico con portada basada en los patrones y colores del proyecto.",

        significado:
            "Simboliza la conservación y transmisión del conocimiento entre generaciones.",

        materiales:
            "Cartón prensado, cartulina, papel bond, papel ecológico y anillado.",

        tecnica:
            "Impresión offset o digital, laminado, encuadernación y acabados selectivos.",

        publico:
            "Estudiantes, docentes, diseñadores y participantes de actividades culturales.",

        uso:
            "Apuntes, dibujo, investigación, planificación y registro de experiencias.",

        variantes:
            "Formato A4, A5, universitario, cuadriculado, rayado y hojas blancas."

    },


    camiseta: {

        titulo: "Camiseta",

        categoria: "Producto textil",

        imagen: "img/souvenirs/camiseta.jpg",

        descripcion:
            "Prenda gráfica que combina elementos deportivos con módulos inspirados en la cultura Puruhá.",

        significado:
            "Representa la unión entre identidad, comunidad, expresión personal y movimiento.",

        materiales:
            "Algodón, poliéster, tela deportiva o mezcla de fibras.",

        tecnica:
            "Serigrafía, sublimación, bordado, vinil textil o impresión directa.",

        publico:
            "Jóvenes, deportistas, turistas, comunidades y participantes de eventos.",

        uso:
            "Vestimenta urbana, deportiva, promocional o cultural.",

        variantes:
            "Modelo unisex, deportivo, cuello redondo, blanco, negro, crema y azul."

    }

};


/* ========================================================= */
/* MODAL DEL CATÁLOGO */
/* ========================================================= */

function activarModalProductos() {

    const modal = document.getElementById("modalProducto");
    const modalFondo = document.getElementById("modalFondo");
    const cerrarModal = document.getElementById("cerrarModal");
    const botonesDetalle = document.querySelectorAll(".boton-detalle");

    const modalImagen = document.getElementById("modalImagen");
    const modalCategoria = document.getElementById("modalCategoria");
    const modalTitulo = document.getElementById("modalTitulo");
    const modalDescripcion = document.getElementById("modalDescripcion");
    const modalSignificado = document.getElementById("modalSignificado");
    const modalMateriales = document.getElementById("modalMateriales");
    const modalTecnica = document.getElementById("modalTecnica");
    const modalPublico = document.getElementById("modalPublico");
    const modalUso = document.getElementById("modalUso");
    const modalVariantes = document.getElementById("modalVariantes");

    if (!modal || !botonesDetalle.length) {
        return;
    }


    function abrirModal(nombreProducto) {

        const producto = productosSouvenirs[nombreProducto];

        if (!producto) {
            return;
        }

        modalImagen.src = producto.imagen;
        modalImagen.alt = producto.titulo;

        modalCategoria.textContent = producto.categoria;
        modalTitulo.textContent = producto.titulo;
        modalDescripcion.textContent = producto.descripcion;
        modalSignificado.textContent = producto.significado;
        modalMateriales.textContent = producto.materiales;
        modalTecnica.textContent = producto.tecnica;
        modalPublico.textContent = producto.publico;
        modalUso.textContent = producto.uso;
        modalVariantes.textContent = producto.variantes;

        modal.classList.add("activo");
        document.body.style.overflow = "hidden";

    }


    function cerrarVentanaModal() {

        modal.classList.remove("activo");
        document.body.style.overflow = "";

    }


    botonesDetalle.forEach(function (boton) {

        boton.addEventListener("click", function () {

            const nombreProducto = boton.dataset.producto;

            abrirModal(nombreProducto);

        });

    });


    if (cerrarModal) {

        cerrarModal.addEventListener("click", cerrarVentanaModal);

    }


    if (modalFondo) {

        modalFondo.addEventListener("click", cerrarVentanaModal);

    }


    document.addEventListener("keydown", function (evento) {

        if (
            evento.key === "Escape" &&
            modal.classList.contains("activo")
        ) {

            cerrarVentanaModal();

        }

    });

}


/* ========================================================= */
/* CUESTIONARIO CULTURAL */
/* ========================================================= */

function activarCuestionario() {

    const preguntaQuiz = document.getElementById("preguntaQuiz");
    const opcionesQuiz = document.getElementById("opcionesQuiz");
    const respuestaQuiz = document.getElementById("respuestaQuiz");
    const progresoPregunta = document.querySelector(".progreso-pregunta");

    if (
        !preguntaQuiz ||
        !opcionesQuiz ||
        !respuestaQuiz ||
        !progresoPregunta
    ) {
        return;
    }


    const preguntas = [

        {
            pregunta:
                "¿En qué provincia se desarrolló principalmente la cultura Puruhá?",

            opciones: [
                "Chimborazo",
                "Manabí",
                "Loja"
            ],

            respuestaCorrecta:
                "Chimborazo"
        },

        {
            pregunta:
                "¿Qué parroquia inspira el sistema cultural de este proyecto?",

            opciones: [
                "Quimiag",
                "Cacha",
                "Licán"
            ],

            respuestaCorrecta:
                "Quimiag"
        },

        {
            pregunta:
                "¿Qué espacio de Riobamba se utiliza para la intervención gráfica?",

            opciones: [
                "Estadio Olímpico",
                "Terminal terrestre",
                "Aeropuerto"
            ],

            respuestaCorrecta:
                "Estadio Olímpico"
        }

    ];


    let indicePregunta = 0;
    let respuestasCorrectas = 0;


    function mostrarPregunta() {

        const preguntaActual = preguntas[indicePregunta];

        progresoPregunta.textContent =
            "Pregunta " +
            (indicePregunta + 1) +
            " de " +
            preguntas.length;

        preguntaQuiz.textContent =
            preguntaActual.pregunta;

        respuestaQuiz.textContent = "";

        opcionesQuiz.innerHTML = "";


        preguntaActual.opciones.forEach(function (opcion) {

            const botonOpcion = document.createElement("button");

            botonOpcion.type = "button";
            botonOpcion.textContent = opcion;
            botonOpcion.dataset.respuesta = opcion;

            botonOpcion.addEventListener("click", function () {

                revisarRespuesta(opcion);

            });

            opcionesQuiz.appendChild(botonOpcion);

        });

    }


    function revisarRespuesta(respuestaSeleccionada) {

        const preguntaActual = preguntas[indicePregunta];

        const botones =
            opcionesQuiz.querySelectorAll("button");

        botones.forEach(function (boton) {

            boton.disabled = true;

        });


        if (
            respuestaSeleccionada ===
            preguntaActual.respuestaCorrecta
        ) {

            respuestasCorrectas++;

            respuestaQuiz.textContent =
                "Respuesta correcta.";

            respuestaQuiz.style.color =
                "#516b4a";

        } else {

            respuestaQuiz.textContent =
                "Respuesta incorrecta. La respuesta correcta es: " +
                preguntaActual.respuestaCorrecta +
                ".";

            respuestaQuiz.style.color =
                "#9b3a2d";

        }


        setTimeout(function () {

            indicePregunta++;

            if (indicePregunta < preguntas.length) {

                mostrarPregunta();

            } else {

                mostrarResultadoFinal();

            }

        }, 1600);

    }


    function mostrarResultadoFinal() {

        progresoPregunta.textContent =
            "Cuestionario completado";

        preguntaQuiz.textContent =
            "Obtuviste " +
            respuestasCorrectas +
            " de " +
            preguntas.length +
            " respuestas correctas.";

        opcionesQuiz.innerHTML = "";

        respuestaQuiz.textContent =
            respuestasCorrectas === preguntas.length
                ? "Excelente. Reconoces los elementos principales del proyecto."
                : "Puedes volver a revisar las secciones Cultura e Intervención.";


        const botonReiniciar =
            document.createElement("button");

        botonReiniciar.type = "button";
        botonReiniciar.textContent =
            "Repetir cuestionario";

        botonReiniciar.addEventListener(
            "click",
            function () {

                indicePregunta = 0;
                respuestasCorrectas = 0;
                mostrarPregunta();

            }
        );

        opcionesQuiz.appendChild(botonReiniciar);

    }


    mostrarPregunta();

}


/* ========================================================= */
/* JUEGO DE RECONOCIMIENTO DE SÍMBOLOS */
/* ========================================================= */

function activarJuegoSimbolos() {

    const opcionesSimbolo =
        document.querySelectorAll(".opcion-simbolo");

    const mensajeSimbolo =
        document.getElementById("mensajeSimbolo");

    if (!opcionesSimbolo.length || !mensajeSimbolo) {
        return;
    }


    opcionesSimbolo.forEach(function (boton) {

        boton.addEventListener("click", function () {

            const simboloSeleccionado =
                boton.dataset.simbolo;

            opcionesSimbolo.forEach(function (otraOpcion) {

                otraOpcion.style.borderColor = "";
                otraOpcion.style.backgroundColor = "";
                otraOpcion.style.color = "";

            });


            if (simboloSeleccionado === "rombo") {

                mensajeSimbolo.textContent =
                    "Correcto. El rombo forma parte del sistema geométrico reinterpretado.";

                mensajeSimbolo.style.color =
                    "#516b4a";

                boton.style.borderColor =
                    "#516b4a";

                boton.style.backgroundColor =
                    "#eef4eb";

                boton.style.color =
                    "#516b4a";

            } else {

                mensajeSimbolo.textContent =
                    "Este símbolo no es el principal. Prueba nuevamente.";

                mensajeSimbolo.style.color =
                    "#9b3a2d";

                boton.style.borderColor =
                    "#9b3a2d";

                boton.style.backgroundColor =
                    "#fff2ef";

                boton.style.color =
                    "#9b3a2d";

            }

        });

    });

}


/* ========================================================= */
/* FORMULARIO DE PARTICIPACIÓN */
/* ========================================================= */

function activarFormulario() {

    const formulario =
        document.getElementById("formularioParticipacion");

    const mensajeFormulario =
        document.getElementById("mensajeFormulario");

    if (!formulario || !mensajeFormulario) {
        return;
    }


    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();


        if (!formulario.checkValidity()) {

            mensajeFormulario.textContent =
                "Completa todos los campos obligatorios.";

            mensajeFormulario.style.color =
                "#9b3a2d";

            formulario.reportValidity();

            return;

        }


        const datosFormulario =
            new FormData(formulario);

        const respuesta = {

            valoracion:
                datosFormulario.get("valoracion"),

            souvenirFavorito:
                datosFormulario.get("souvenirFavorito"),

            simboloReconocido:
                datosFormulario.get("simboloReconocido"),

            nuevoProducto:
                datosFormulario.get("nuevoProducto"),

            motivaCultura:
                datosFormulario.get("motivaCultura"),

            visitariaLugar:
                datosFormulario.get("visitariaLugar"),

            opinion:
                datosFormulario.get("opinion"),

            fecha:
                new Date().toLocaleString("es-EC")

        };


        guardarRespuestaLocal(respuesta);


        mensajeFormulario.textContent =
            "Gracias. Tu opinión fue registrada correctamente en este dispositivo.";

        mensajeFormulario.style.color =
            "#516b4a";

        formulario.reset();


        setTimeout(function () {

            mensajeFormulario.textContent = "";

        }, 6000);

    });

}


/* ========================================================= */
/* GUARDAR RESPUESTAS EN EL NAVEGADOR */
/* ========================================================= */

function guardarRespuestaLocal(respuesta) {

    try {

        const respuestasAnteriores =
            JSON.parse(
                localStorage.getItem(
                    "respuestasRaicesMovimiento"
                )
            ) || [];

        respuestasAnteriores.push(respuesta);

        localStorage.setItem(
            "respuestasRaicesMovimiento",
            JSON.stringify(respuestasAnteriores)
        );

    } catch (error) {

        console.warn(
            "No fue posible guardar la respuesta localmente.",
            error
        );

    }

}


/* ========================================================= */
/* PUNTOS INFORMATIVOS DEL MAPA */
/* ========================================================= */

function activarPuntosMapa() {

    const puntosMapa =
        document.querySelectorAll(".punto-mapa");

    if (!puntosMapa.length) {
        return;
    }


    puntosMapa.forEach(function (punto) {

        punto.addEventListener("click", function () {

            const informacion =
                punto.dataset.informacion;

            const textoOriginal =
                punto.dataset.textoOriginal ||
                punto.textContent.trim();

            if (!punto.dataset.textoOriginal) {

                punto.dataset.textoOriginal =
                    textoOriginal;

            }


            if (
                punto.classList.contains(
                    "informacion-visible"
                )
            ) {

                punto.innerHTML =
                    "<span></span>" +
                    punto.dataset.textoOriginal;

                punto.classList.remove(
                    "informacion-visible"
                );

            } else {

                punto.innerHTML =
                    "<span></span>" +
                    informacion;

                punto.classList.add(
                    "informacion-visible"
                );

            }

        });

    });

}


/* ========================================================= */
/* AÑO AUTOMÁTICO EN EL PIE DE PÁGINA */
/* ========================================================= */

function actualizarAnio() {

    const textoPie =
        document.querySelector(".pie-contenido > p");

    if (!textoPie) {
        return;
    }

    const anioActual =
        new Date().getFullYear();

    textoPie.textContent =
        "Universidad Nacional de Chimborazo · Diseño Gráfico · " +
        anioActual;

}


/* ========================================================= */
/* DESPLAZAMIENTO SUAVE PARA ENLACES INTERNOS */
/* ========================================================= */

document.addEventListener("click", function (evento) {

    const enlace =
        evento.target.closest('a[href^="#"]');

    if (!enlace) {
        return;
    }

    const destinoId =
        enlace.getAttribute("href");

    if (
        !destinoId ||
        destinoId === "#"
    ) {
        return;
    }

    const destino =
        document.querySelector(destinoId);

    if (!destino) {
        return;
    }

    evento.preventDefault();

    const alturaEncabezado =
        document.getElementById("encabezado")
            ? document
                .getElementById("encabezado")
                .offsetHeight
            : 0;

    const posicionDestino =
        destino.getBoundingClientRect().top +
        window.scrollY -
        alturaEncabezado;

    window.scrollTo({

        top: posicionDestino,

        behavior: "smooth"

    });

});
// todas nuestros textos para las adivinanzas
const textos = [
    'Manzana',
    'Paraguay',
    'Helicoptero',
];
const guia = ['Es una fruta roja', 'Es un pais de America', 'Medio de transporte'];

// almacena la lista de letras
let palabras = [];
let entrada = true;
let letras = [];
let palabra_con_guion = '';


//cantidad de intentos
let intento;
let texto_intento;


// elementos de la pagina
const textoGuia = document.getElementById('guia');
const messageElement = document.getElementById('mensaje');
const typedValueElement = document.getElementById('letra_tipeada');
const cantidadIntento = document.getElementById('intentos');
const palabraOculta = document.getElementById('palabra_oculta');
const letraEscrita = document.getElementById('letras_escritas')



document.getElementById('inicio').addEventListener('click', () => {
    //Mostrar input
    typedValueElement.style.visibility = "visible"; // show
    // elegimos el texto de ejemplo a mostrar
    const textoIndice = Math.floor(Math.random() * textos.length);
    //Palabra secreta
    const texto = textos[textoIndice];
    palabras = texto;
    console.log(palabras);
    //Guia
    const texto1 = guia[textoIndice];
    textoGuia.innerHTML = texto1;

    // vaciamos el valor typedValueElement para la siguiente letra
    typedValueElement.value = '';

    //Calcular intentos restantes
    let cantidad = texto.length;
    intento = cantidad + 5;
    texto_intento = 'Intentos restantes: ' + intento; 
    //Mostrar la cantidad de intentos
    cantidadIntento.innerHTML = texto_intento;

    //Mostrar guiones en vez de la palabra ocultandolo,.
    palabra_con_guion = texto.replace(/./g, "_ ");
    palabraOculta.innerHTML = palabra_con_guion;
});

typedValueElement.addEventListener('input', () => {
    
    //Funcion para reemplazar palabra oculta por las letras que vamos metiendo
    String.prototype.replaceAt=function(index, character) { return this.substring(0, index) + character + this.substring(index+character.length); } 

    // tomamos el valor actual
    const typedValue = typedValueElement.value;
    console.log(typedValue);

    //Letras escritas
    letras = letras + '  ' + typedValue;
    letraEscrita.innerHTML = letras;

    //Revisando si existe o no en la palabra oculta;
    for(i in palabras){
        if (typedValue == palabras[i]) {
            //Reemplazando letras por guiones
            palabra_con_guion = palabra_con_guion.replaceAt(i*2,typedValue);
            palabraOculta.innerHTML = palabra_con_guion;
        }else{
            console.log("No existe");
        }
    }

    if (!(palabra_con_guion.includes("_ "))) {
        alert("Has ganado");
    }else{
        if (intento === 0) {
            alert("Has Perdido");
            alert("Este sitio se actualizará en 5 segundos");
            setTimeout(() => {
                location.reload();
            }, 5000);
        }
    }

        //Por cada error descontar un intento;
        if (!(palabras.includes(typedValue))) {
            intento = intento - 1;
            texto_intento = 'Intentos restantes: ' + intento; 
            cantidadIntento.innerHTML = texto_intento;    
        }
    if (typedValue.length = 1){
        // vaciamos el valor typedValueElement para la siguiente letra
        // Solo permitimos la entrada de una letra
        setTimeout(() => {
            typedValueElement.value = '';
        }, 100);
    }
});
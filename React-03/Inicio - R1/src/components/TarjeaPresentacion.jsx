import Carpintero from '../Assets/Carpintero.webp' //Importamos la imagen de la carpeta Assets

export function TarjetaPresentacion(){
    const nombre = "Juan"
    const apellido = "Hernandez"
    const profesion = "Carpintero"

return(
    <div className="tarjeta">
    <div className="informacion">{nombre}</div>
    <div className="informacion">{apellido}</div>
    <div className="informacion">{profesion}</div>
    <img
        className="imagen"
        src={Carpintero}
        alt="Imagen de stock"
    />
</div>)
}


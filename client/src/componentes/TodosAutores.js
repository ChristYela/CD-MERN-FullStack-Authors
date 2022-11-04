import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const TodosAutores = () => {

    const [autores, setAutores] = useState ([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/autores")
            .then(res => setAutores(res.data))
            .catch(err => console.log(err));

    }, [])
    
    const borrarAutor = id => {
        axios.delete("http://localhost:8000/api/autores/"+id)
            .then(res => {
                let nuevaLista = autores.filter(autores => autores._id !== id)
                setAutores(nuevaLista);

            })
    }

    return(
        <div>
            <h1 className="text-center">Autores</h1>
            <Link to="/nuevo" className="btn btn-success">Nuevo Autor</Link>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Imagen</th>
                        <th>Libros</th>
                        <th>Cuentos</th>
                        <th>Articulos</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        autores.map((autor, index) => (
                            <tr key = {index}>
                                <td>{autor.nombre}</td>
                                <td>
                                    <img src={autor.imagen} alt="autor" className="img-fluid img-thumbnail"/>
                                </td>
                                <td>
                                    {
                                        autor.libros ? <span className="bi bi-check text-success"></span>
                                        : <span classname="bi bi-x text-danger"></span>
                                    }
                                </td>
                                <td>
                                    {
                                        autor.cuentos ? <span className="bi bi-check text-success"></span>
                                        : <span classname="bi bi-x text-danger"></span>
                                    }
                                </td>
                                <td>
                                    {
                                        autor.articulos ? <span className="bi bi-check text-success"></span>
                                        : <span classname="bi bi-x text-danger"></span>
                                    }
                                </td>
                                <td>
                                    <Link className="btn btn-warning" to={`/autor/editar/${autor._id}`}>Editar</Link>
                                    <button className="btn btn-danger" onClick={() => borrarAutor(autor._id) } >Eliminar</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>
        </div>

    )
}

export default TodosAutores;
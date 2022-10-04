// Utilidades para grabar PouchDB

// import * as PouchDB from "pouchdb";

const db = new PouchDB('mensajes');
// import PouchDB from "pouchdb";

// const db = new PouchDB("mensajes");

const guardarMensaje = (mensaje) => {
  mensaje._id = new Date().toISOString();

  return db.put(mensaje).then(() => {
    self.registration.sync.register("nuevo-post");

    const newResp = {
      ok: true,
      offline: true
    };

    return new Response(JSON.stringify(newResp));
  });
};

//Postear mensajes a la API

const postearMensajes = () => {
  // Revisar posteos pendientes

  const posteos = [];
  
  return db.allDocs({ include_docs: true }).then((docs) => {
    docs.rows.forEach((row) => {
      const doc = row.doc;

      const fetchProm = fetch("api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doc),
      }).then((res) => {
        // Si entró aca ya realizó el posteo. Entonces borramos el archivo

        return db.remove(doc);
      });

      posteos.push(fetchProm);
    }); // fin del foreach

    return Promise.all(posteos);
  });
};

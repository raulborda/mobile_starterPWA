/* eslint-disable array-callback-return */

import { Form, Button, Selector, TextArea, Modal } from "antd-mobile";
import { CheckOutline } from "antd-mobile-icons";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./DetalleTarea.css";
import moment from "moment";
import { GlobalContext } from "../../context/GlobalContext";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CLIENTE } from "../../../graphql/queries/Cliente";
import { GET_TIPO_TAREA } from "../../../graphql/queries/TipoTarea";
import Select from "react-select";
import { GET_TIPO_ORIGEN } from "../../../graphql/queries/TipoOrigen";
import Note from "../note/Note";
import { UPDATE_TAREA } from "../../../graphql/mutations/tareas";

const DetalleTarea = () => {
  const { userId, note, setNote, pollTareas } = useContext(GlobalContext);

  const location = useLocation();

  const history = useHistory()

  const [tarea, setTarea] = useState(location.state);

  const [idSelector, setIdSelector] = useState(tarea.pri_id);

  const [clientes, setClientes] = useState([]);

  const [buscador, setBuscador] = useState(tarea.cli_nombre);
  const [ocultarC, setOcultarC] = useState(true);
  const [limpiar, setLimpiar] = useState(false);

  const [file, setFile] = useState({});
  const [fList, setFlist] = useState([]);

  const [updateTareaResolver] = useMutation(UPDATE_TAREA, {
    onCompleted: () => {

      pollTareas.inicial(1000);
      setTimeout(() => {
        pollTareas.stop();
      }, 1000);

      Modal.alert({
        header: (
          <CheckOutline
            style={{
              fontSize: 64,
              color: "var(--adm-color-primary)",
            }}
          />
        ),
        title: "Tarea editada correctamente",
        confirmText: "Cerrar",
        onConfirm: history.goBack(),
      });
    },
  });

  const handleChange = (value) => {
    if (value.target.value === "" || value.target.value === null) {
    }
    setBuscador(value.target.value);
  };

  const { loading, error, data } = useQuery(GET_CLIENTE, {
    variables: {
      input: buscador.length > 2 ? buscador : "",
      idUsuario: userId,
    },
  });

  useEffect(() => {
    if (data) {
      let dataClientes = [];

      data.getClientesLimitResolver.map((cliente) => {
        if (cliente.cli_id != tarea.cli_id) dataClientes.push(cliente);
      });

      if (buscador === tarea.cli_nombre) {
        dataClientes.push({
          __typename: "Clientes",
          cli_email: null,
          cli_id: tarea.cli_id.toString(),
          cli_nombre: tarea.cli_nombre,
          cli_telefono1: null,
        });
      }

      setClientes(dataClientes);
    }
  }, [data]);

  const handleSelect = (value) => {
    setBuscador(value.target.value);

    if (ocultarC === true) {
      setOcultarC(false);
    }

    if (ocultarC === false) {
      setOcultarC(true);
    }
  };

  const handleLimpiar = (value) => {
    if (limpiar === false) {
      setLimpiar(true);
      setOcultarC(false);
    }
    if (limpiar === true) {
      setLimpiar(false);
      setOcultarC(false);
    }

    setBuscador("");
  };

  const [tiposTareas, setTiposTareas] = useState([]);

  const { data: dataTipoTarea } = useQuery(GET_TIPO_TAREA, {
    variables: {
      idCategoria: 1,
    },
  });

  useEffect(() => {
    if (dataTipoTarea) {
      setTiposTareas(dataTipoTarea.getTiposTareaResolver);
    }
  }, [dataTipoTarea]);

  const [tiposOrigenes, setTiposOrigenes] = useState([]);

  const { data: dataTipoOrigen } = useQuery(GET_TIPO_ORIGEN, {});

  useEffect(() => {
    if (dataTipoOrigen) {
      setTiposOrigenes(dataTipoOrigen.getOrigenesResolver);
    }
  }, [dataTipoOrigen]);

  const prioridad = [
    {
      label: (
        <div
          className={
            idSelector === 1 ? "selector-alta seleccionado" : "selector-alta"
          }
        >
          <p className="selector-texto">ALTA</p>
        </div>
      ),
      value: 1,
    },
    {
      label: (
        <div
          className={
            idSelector === 2 ? "selector-media seleccionado" : "selector-media"
          }
        >
          <p className="selector-texto">MEDIA</p>
        </div>
      ),
      value: 2,
    },
    {
      label: (
        <div
          className={
            idSelector === 3 ? "selector-baja seleccionado" : "selector-baja"
          }
        >
          <p className="selector-texto">BAJA</p>
        </div>
      ),
      value: 3,
    },
  ];

  const [form] = Form.useForm();

  const onFinish = (v) => {


    let inputAdjunto;
    if (Object.keys(file).length) {
      const extension = file.originalname.split(".")[1];
      inputAdjunto = {
        up_filename: file.fileName,
        up_mimetype: extension,
        up_hashname: file.filename,
        usu_id: 1,
        up_detalle: v.adj_detalle,
        up_size: String(file.size),
      };
    }

    const inputTarea = {
      tar_asunto: v.tar_asunto,
      tar_vencimiento: v.tar_vencimiento,
      tar_horavencimiento: v.tar_horavencimiento,
      est_id: 1,
      usu_id: userId,
      cli_id: tarea.cli_id,
      ale_id: null,
      tar_alertanum: null,
      tip_id: v.tip_id ? v.tip_id.value : tarea.tip_id,
      pri_id: v.pri_id ? Number(v.pri_id[0]) : tarea.pri_id,
    };

    let inputNota = {
      not_desc: note ? note : "",
      not_importancia: v.pri_id ? Number(v.pri_id[0]) : tarea.pri_id,
      not_id: tarea.not_id,
    };

    if (fList.length === 0) {
      inputAdjunto = null;
    }

    updateTareaResolver({
      variables: {
        idTarea: tarea.tar_id,
        inputTarea,
        inputAdjunto,
        inputNota,
        idUsuario: userId,
      },
    });

    setNote("");
    form.resetFields();
    setFlist([]);
  };

  return (
    <div className="detalle-tarea-contenedor">
      <Form
        name="tareaForm"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        footer={
          <Button
            block
            type="submit"
            color="primary"
            size="large"
          >
            Guardar
          </Button>
        }
      >
        <Form.Item
          label="Cliente"
          name="cli_id"
          initialValue={{ label: tarea.cli_nombre, id: tarea.cli_id }}
        >
          {clientes &&
            clientes.map((cliente) => (
              <>
                {buscador !== "" ? (
                  <div className="div_clienteSelect_btn">
                    <input
                      className="select_nueva_tarea input_cliente"
                      type="text"
                      value={cliente.cli_nombre}
                      readOnly={true}
                    />
                  </div>
                ) : (
                  ""
                )}
              </>
            ))}
        </Form.Item>
        <Form.Item
          label="Asunto"
          name="tar_asunto"
          initialValue={tarea.tar_asunto}
        >
          <TextArea autoSize={true} />
        </Form.Item>
        <Form.Item label="Tipo de Tarea" name="tip_id">
          <Select
            className="select_nueva_tarea"
            defaultValue={{ label: tarea.tip_desc, value: tarea.tip_id }}
            options={
              tiposTareas &&
              tiposTareas.map((tipoTarea) => ({
                label: tipoTarea.tip_desc,
                value: tipoTarea.tip_id,
              }))
            }
          />
        </Form.Item>
        {/* <Form.Item label="Fuente" name="ori_id">
          <Select
            className="select_nueva_tarea"
            defaultValue={{ label: tarea.ori_desc, value: tarea.ori_id }}
            options={
              tiposOrigenes &&
              tiposOrigenes.map((tipoOrigen) => ({
                label: tipoOrigen.ori_desc,
                value: tipoOrigen.ori_id,
              }))
            }
          />
        </Form.Item> */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              width: "50%",
            }}
          >
            <Form.Item
              label="Vencimiento"
              name="tar_vencimiento"
              initialValue={tarea.tar_vencimiento}
            >
              <input className="input-fechaHora" type="date" />
            </Form.Item>
          </div>
          <div
            style={{
              width: "50%",
            }}
          >
            <Form.Item
              label="Hora"
              name="tar_horavencimiento"
              initialValue={moment(
                tarea.tar_horavencimiento,
                "HH:mm:ss"
              ).format("LT")}
            >
              <input className="input-fechaHora" type="time" />
            </Form.Item>
          </div>
        </div>
        <Form.Item label="Nota" name="not_desc">
          <Note
            editValue={tarea.not_desc || ""}
            width="100%"
            height="100%"
          ></Note>
        </Form.Item>

        <Form.Item label="Prioridad" name="pri_id">
          <Selector
            style={{
              "--border-radius": "10px",
              "--border": "none",
              "--checked-border": "none",
              "--padding": "0px",
              fontSize: "16px",
            }}
            showCheckMark={false}
            label="Prioridad"
            options={prioridad}
            onChange={(v) => setIdSelector(v[0])}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default DetalleTarea;

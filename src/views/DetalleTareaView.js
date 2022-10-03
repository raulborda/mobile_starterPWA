import DetalleTarea from "../Components/ui/detalleTarea/DetalleTarea";
import MainLayout from "../Components/ui/layout/MainLayout";

const DetalleTareaView = () => {
  return (
    <MainLayout titulo="Editar Tarea" modo="sinOp">
      <DetalleTarea />
    </MainLayout>
  );
};

export default DetalleTareaView;

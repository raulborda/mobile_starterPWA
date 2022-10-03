import MainLayout from "../Components/ui/layout/MainLayout";
import NuevaTarea from "../Components/ui/nuevaTarea/NuevaTarea";

const NuevaTareaView = () => {
  return (
    <MainLayout titulo="Nueva Tarea" modo="sinOp">
      <NuevaTarea />
    </MainLayout>
  );
};

export default NuevaTareaView;

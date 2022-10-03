import MainLayout from "../Components/ui/layout/MainLayout";
import Tareas from "../Components/ui/tareas/Tareas";

const HomeView = () => {
  return (
    <MainLayout titulo="" modo="sinBack">
      <Tareas />
    </MainLayout>
  );
};

export default HomeView;

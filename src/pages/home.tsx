import { Error } from '@/components/error/error';
import { DesktopLayout } from '@/components/layouts/desktop/desktop';
import { MobileLayout } from '@/components/layouts/mobile/mobile';
import { Loader } from '@/components/loader/loader';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useGetIngredientsQuery } from '@/store/api/ingredientsApi';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import { DndProvider } from 'react-dnd-multi-backend';

export const Home = (): React.JSX.Element => {
  const { screenType } = useWindowSize();
  const { error, isLoading } = useGetIngredientsQuery();

  if (error) {
    return <Error text="Ошибка получения данных" />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <DndProvider options={HTML5toTouch}>
        {screenType === 'mobile' && <MobileLayout />}
        {screenType === 'desktop' && <DesktopLayout />}
      </DndProvider>
    </>
  );
};

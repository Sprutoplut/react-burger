import { DesktopLayout } from '@/components/layouts/desktop/desktop';
import { MobileLayout } from '@/components/layouts/mobile/mobile';
import { useWindowSize } from '@/hooks/useWindowSize';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import { DndProvider } from 'react-dnd-multi-backend';

export const Home = (): React.JSX.Element => {
  const { screenType } = useWindowSize();

  return (
    <>
      <DndProvider options={HTML5toTouch}>
        {screenType === 'mobile' && <MobileLayout />}
        {screenType === 'desktop' && <DesktopLayout />}
      </DndProvider>
    </>
  );
};

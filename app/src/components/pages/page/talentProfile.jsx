import { useEffect } from 'react';
import { usePageContext } from '../../../app/context/page';
import {
  getConfigPage,
  getTalentProfile,
  usedTransformedLocation,
} from '../../../shared/api';
import { Loading } from '../../../shared/ui';
import { HowToWorkWithUs, TalentProfileSection } from '../../paragraphs';
import NotFound from '../not-found';

const ScrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};

const TalentProfile = ({ setIsAdmin, setTitle, setNodeIsLoading }) => {
  const pathname = usedTransformedLocation();
  const { data: node, isLoading, isError } = getTalentProfile(pathname);
  const { data: configHowToWork } = getConfigPage('how_to_work_with_famaash');
  const nodeData = node?.data || {};
  const howToWorkWithUs = configHowToWork?.data || {};
  const { is_admin, title, breadcrumbs, user_id } = nodeData;
  const { setBreadcrumbs } = usePageContext();

  useEffect(() => {
    setIsAdmin(is_admin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [is_admin]);

  useEffect(() => {
    setNodeIsLoading(isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (breadcrumbs) setBreadcrumbs(breadcrumbs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breadcrumbs]);

  useEffect(() => {
    if (title) {
      setTitle(title);
      document.title = title;
    }
    ScrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  if (isLoading) return <Loading />;

  if (isError) return <NotFound />;

  return (
    <>
      {is_admin && (
        <a className="node-edit" href={`/user/${user_id}/edit`}>
          {'Edit user'}
        </a>
      )}
      {nodeData && <TalentProfileSection data={nodeData} />}
      {howToWorkWithUs && <HowToWorkWithUs data={howToWorkWithUs} />}
    </>
  );
};

export default TalentProfile;

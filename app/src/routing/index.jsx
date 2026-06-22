import { useState } from 'react';
import { Route, Routes } from 'react-router';
import { HeaderContextProvider } from '../app/context/header';
import { PageContextProvider } from '../app/context/page';
import Layout from '../components/layout';
import Footer from '../components/layout/footer';
import Header from '../components/layout/header';
import Page from '../components/pages/page';
import TalentProfile from '../components/pages/page/talentProfile';
import { USER_PAGE_PATH } from '../shared/config';

export const Routing = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [title, setTitle] = useState(false);
  const [nodeIsLoading, setNodeIsLoading] = useState(false);

  return (
    <div className={isAdmin ? 'is_admin' : ''}>
      <HeaderContextProvider>
        <Header />
      </HeaderContextProvider>
      <PageContextProvider>
        <Layout>
          <Routes>
            <Route
              path={`/${USER_PAGE_PATH}/:name`}
              element={
                <TalentProfile
                  setIsAdmin={setIsAdmin}
                  setTitle={setTitle}
                  setNodeIsLoading={setNodeIsLoading}
                />
              }
            />
            <Route
              path="*"
              element={
                <Page
                  setIsAdmin={setIsAdmin}
                  setTitle={setTitle}
                  setNodeIsLoading={setNodeIsLoading}
                />
              }
            />
          </Routes>
        </Layout>
      </PageContextProvider>
      <Footer title={title} nodeIsLoading={nodeIsLoading} />
    </div>
  );
};

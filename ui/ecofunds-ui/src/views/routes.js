import React from 'react';

import {
  Home as HomeView,
  Campaign as CampaignView,
  Article as ArticleView,
  AccountGeneral as AccountGeneralView,
  LogIn as LogInView,
} from 'views';

const routes = [
  {
    path: '/',
    renderer: (params = {}) => <HomeView {...params} />,
  },
  {
    path: '/Campaign',
    renderer: (params = {}) => <CampaignView {...params} />,
  },
  {
    path: '/AboutCampaign',
    renderer: (params = {}) => <ArticleView {...params} />,
  },

  {
    path: '/account',
    renderer: (params = {}) => <AccountGeneralView {...params} />,
  },
  {
    path: '/LogIn',
    renderer: (params = {}) => <LogInView {...params} />,
  },
];

export default routes;

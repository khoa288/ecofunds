import React from 'react';

import {
  Home as HomeView,
  Campaign as CampaignView,
  Article as ArticleView,
  AccountGeneral as AccountGeneralView,
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
];

export default routes;

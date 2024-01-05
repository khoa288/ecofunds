import React from 'react';

import {
  Home as HomeView,
  Campaign as CampaignView,
  Article as ArticleView,
  AccountBilling as AccountBillingView,
  AccountGeneral as AccountGeneralView,
  AccountNotifications as AccountNotificationsView,
  AccountSecurity as AccountSecurityView,
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
    path: '/account-billing',
    renderer: (params = {}) => <AccountBillingView {...params} />,
  },
  {
    path: '/account-general',
    renderer: (params = {}) => <AccountGeneralView {...params} />,
  },
  {
    path: '/account-notifications',
    renderer: (params = {}) => <AccountNotificationsView {...params} />,
  },
  {
    path: '/account-security',
    renderer: (params = {}) => <AccountSecurityView {...params} />,
  },
];

export default routes;

export interface INavigationRoute {
  name: string
  displayName: string
  meta: { icon: string }
  children?: INavigationRoute[]
}

export default {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'dashboard',
      displayName: 'menu.dashboard',
      meta: {
        icon: 'vuestic-iconset-dashboard',
      },
    },
    {
      name: 'statistics',
      displayName: 'menu.users_management',
      meta: {
        icon: 'vuestic-iconset-user',
      },
      disabled: true,
      children: [
        {
          name: 'users',
          displayName: 'menu.users',
        },
      ],
    },
    {
      name: 'statistics',
      displayName: 'menu.clients',
      meta: {
        icon: 'vuestic-iconset-user',
      },
      disabled: true,
      children: [
        {
          name: 'guides',
          displayName: 'menu.guides',
        },
        {
          name: 'drivers',
          displayName: 'menu.drivers',
        },
        {
          name: 'tourist',
          displayName: 'tourist',
        },
      ],
    },
    {
      name: 'tourism-management',
      displayName: 'menu.tourism_management',
      meta: {
        icon: 'hotel',
      },

      children: [
       
        {
          name: 'accommodition',
          displayName: 'menu.accommodations',
        },
        {
          name: 'category',
          displayName: 'accommodations category',
        },
        {
          name: 'flight',
          displayName: 'menu.flight',
        },
        {
          name: 'offer',
          displayName: 'menu.offer',
        },
        {
          name: 'Attract',
          displayName: 'Attractive Locations',
        },
      ],
    },

    {
      name: 'settings',
      displayName: 'menu.settings',
      meta: {
        icon: 'settings',
      },

      children: [
        {
          name: 'pages',
          displayName: 'menu.pages',
        },
        {
          name: 'contact',
          displayName: 'menu.contact',
        },
        {
          name: 'banner',
          displayName: 'banner',
        },
        {
          name: 'Country',
          displayName: 'Country prices',
        },
        {
          name: 'reminder',
          displayName: 'reminder',
        },
      ],
    },
    {
      name: 'order list',
      displayName: 'order list',
      meta: {
        icon: 'eye',
      },

      children: [
        {
          name: 'order',
          displayName: 'order list',
        },
      ],
    },
  ] as INavigationRoute[],
}

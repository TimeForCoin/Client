import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import(/* webpackChunkName: "user" */ './views/User.vue')
    },
    {
      path: '/mission',
      name: 'mission',
      component: () => import(/* webpackChunkName: "mission" */ './views/Mission.vue')
    },
    {
      path: '/discover',
      name: 'discover',
      component: () => import(/* webpackChunkName: "discover" */ './views/Discover.vue')
    },
    {
      path: '/create_mission',
      name: 'create_mission',
      component: () => import(/* webpackChunkName: "create_mission" */ './views/MissionCenter/MissionTypeChoice.vue')
    },
    {
      path: '/mission_information',
      name: '/mission_information',
      component: () => import(/* webpackChunkName: "create_normal_mission" */ './views/MissionCenter/MissionInformation.vue')
    },
    {
      path: '/create_questionnaire',
      name: 'create_questionnaire',
      component: () => import(/* webpackChunkName: "create_questionnaire" */ './views/Questionnaire.vue')
    },
    {
      path: '/mission_detail',
      name: 'mission_detail',
      component: () => import(/* webpackChunkName: "create_mission" */ './views/MissionDetail.vue')
    },
    {
      path: '/questionnaire_answer',
      name: 'questionnaire_answer',
      props: { state: 'answer' },
      component: () => import(/* webpackChunkName: "create_mission" */ './views/Presentation.vue')
    },
    {
      path: '/questionnaire_statistics',
      name: 'questionnaire_statistics',
      props: { state: 'statistics' },
      component: () => import(/* webpackChunkName: "create_mission" */ './views/Presentation.vue')
    }
  ]
})

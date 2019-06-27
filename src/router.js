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
      component: () => import('./views/About.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('./views/User.vue')
    },
    {
      path: '/mission',
      name: 'mission',
      component: () => import('./views/Mission.vue')
    },
    {
      path: '/discover',
      name: 'discover',
      component: () => import('./views/Discover.vue')
    },
    {
      path: '/create_mission',
      name: 'create_mission',
      component: () => import('./views/MissionCenter/MissionTypeChoice.vue')
    },
    {
      path: '/mission_information',
      name: '/mission_information',
      component: () => import('./views/MissionCenter/MissionInformation.vue')
    },
    {
      path: '/create_questionnaire',
      name: 'create_questionnaire',
      component: () => import('./views/Questionnaire.vue')
    },
    {
      path: '/mission_detail',
      name: 'mission_detail',
      component: () => import('./views/MissionDetail.vue')
    },
    {
      path: '/questionnaire_answer',
      name: 'questionnaire_answer',
      props: { state: 'answer' },
      component: () => import('./views/Presentation.vue')
    },
    {
      path: '/questionnaire_statistics',
      name: 'questionnaire_statistics',
      props: { state: 'statistics' },
      component: () => import('./views/Presentation.vue')
    },
    {
      path: '/questionnaire_preview',
      name: 'questionnaire_preview',
      props: { state: 'preview' },
      component: () => import('./views/Presentation.vue')
    }
  ]
})

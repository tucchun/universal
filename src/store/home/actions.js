// import axios from 'axios'
import { CHANGE_LIST } from './constants'

const  changeList = list => ({
  type: CHANGE_LIST,
  payload: list
})

export const getHomeList = () => (dispatch, getState, axios) => {
  return axios.get('/api/home.json').then(res => {
    const list = res.data.data;
    console.log('list', list)
    dispatch(changeList(list))
  })
}